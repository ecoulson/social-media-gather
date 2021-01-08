import { inject, injectable, tagged } from "inversify";
import Tags from "../../../@Types/Tags";
import Types from "../../../@Types/Types";
import IUser from "../../../Entities/User/IUser";
import Webhook from "../../../Entities/Webhook/Webhook";
import YouTubeVideo from "../../../Entities/YouTubeVideo/YouTubeVideo";
import IYouTubePaginatedResult from "../../../Library/YouTube/IYouTubePaginatedResult";
import IYouTubeChannelSchema from "../../../Library/YouTube/Schema/IYouTubeChannelSchema";
import IYouTubePlaylistSchema from "../../../Library/YouTube/Schema/IYouTubePlaylistSchema";
import IYouTubeThumbnailSchema from "../../../Library/YouTube/Schema/IYouTubeThumbnailSchema";
import IYouTubeVideoSchema from "../../../Library/YouTube/Schema/IYouTubeVideoSchema";
import YouTubeAPIClient from "../../../Library/YouTube/YouTubeAPIClient";
import UserRepository from "../../../Repositories/User/UserRepository";
import WebhookRepository from "../../../Repositories/Webhook/WebhookRepository";
import YouTubeRepository from "../../../Repositories/YouTubeVideo/YouTubeRepository";
import IMediaPlatformChannelService from "../IMediaChannelService";
import IMediaPlatformChannelSearchResult from "../IMediaPlatformChannelSearchResult";

@injectable()
export default class YouTubeChannelService implements IMediaPlatformChannelService {
    private static readonly LEASE_SECONDS = 60 * 60 * 24 * 7;

    constructor(
        @inject(Types.YouTubeAPIClient) private youTubeAPIClient: YouTubeAPIClient,
        @inject(Types.YouTubeVideoRepository)
        @tagged(Tags.MONGO, true)
        private youTubeVideoRepository: InstanceType<typeof YouTubeRepository>,
        @inject(Types.UserRepository)
        @tagged(Tags.MONGO, true)
        private userRepository: InstanceType<typeof UserRepository>,
        @inject(Types.WebhookRepository)
        @tagged(Tags.MONGO, true)
        private webhookRepository: InstanceType<typeof WebhookRepository>
    ) {}

    async searchPlatformForChannel(username: string): Promise<IMediaPlatformChannelSearchResult> {
        const channels = await this.youTubeAPIClient.channels.searchChannels(username);
        return {
            channels: channels.map((channel) => {
                return {
                    id: channel.id.channelId,
                    username: channel.snippet.title,
                    profilePicture: channel.snippet.thumbnails.default.url
                };
            })
        };
    }

    async registerChannel(user: IUser, youTubeChannelId: string): Promise<void> {
        user.setYouTubeId(youTubeChannelId);
        this.createYoutubePosts(user, youTubeChannelId);
        this.registerWebhook(user, youTubeChannelId);
        if (user.id() === "") {
            this.userRepository.add(user);
        } else {
            this.userRepository.update(user);
        }
    }

    private async createYoutubePosts(user: IUser, youTubeChannelId: string) {
        const youTubeChannel = await this.youTubeAPIClient.channels.get(youTubeChannelId);
        let uploadPage = await this.getUploads(youTubeChannel);
        do {
            const videos = await this.getUploadedVideosOnPage(uploadPage);
            this.createYouTubeVideoPosts(user, videos);
            uploadPage = await uploadPage.getNextPage();
        } while (uploadPage.hasNextPage());
    }

    private getUploads(channel: IYouTubeChannelSchema) {
        return this.youTubeAPIClient.playlist.list({
            part: ["contentDetails"],
            playlistId: channel.contentDetails.relatedPlaylists.uploads,
            maxResults: 50
        });
    }

    private async getUploadedVideosOnPage(
        uploadPage: IYouTubePaginatedResult<IYouTubePlaylistSchema[]>
    ) {
        const videoIds = uploadPage.items().map((item) => {
            return item.contentDetails.videoId;
        });
        return await this.youTubeAPIClient.videos.list({
            ids: videoIds,
            parts: ["snippet", "contentDetails", "statistics"]
        });
    }

    private async createYouTubeVideoPosts(user: IUser, videos: IYouTubeVideoSchema[]) {
        const videoPosts = videos.map(
            (video) =>
                new YouTubeVideo(
                    "",
                    user.id(),
                    video.publishedAt,
                    this.getThumbnail(video.thumbnails),
                    video.title,
                    video.id
                )
        );
        videoPosts.forEach((videoPost) => this.youTubeVideoRepository.add(videoPost));
    }

    private getThumbnail(thumbnails: IYouTubeThumbnailSchema) {
        if (thumbnails.standard) {
            return thumbnails.standard.url;
        }
        if (thumbnails.high) {
            return thumbnails.high.url;
        }
        if (thumbnails.maxres) {
            return thumbnails.maxres.url;
        }
        if (thumbnails.medium) {
            return thumbnails.medium.url;
        }
        return thumbnails.default.url;
    }

    private async registerWebhook(user: IUser, youTubeChannelId: string) {
        const expirationDate = new Date();
        expirationDate.setSeconds(
            expirationDate.getSeconds() + YouTubeChannelService.LEASE_SECONDS
        );
        const webhook = new Webhook(
            "",
            expirationDate,
            new Date(),
            "youtube",
            `https://www.youtube.com/xml/feeds/videos.xml?channel_id=${user.id()}`,
            `${this.youTubeAPIClient.baseUrl()}/api/webhook/youtube/callback?userId=${user.id()}`,
            youTubeChannelId,
            user.id()
        );
        this.youTubeAPIClient.webhooks.register({
            mode: "subscribe",
            callback: webhook.callbackUrl(),
            verify: "async",
            topic: webhook.topicUrl()
        });
        this.webhookRepository.add(webhook);
    }

    async registerChannelForUserId(userId: string, youTubeChannelId: string): Promise<void> {
        const user = await this.userRepository.findById(userId);
        this.registerChannel(user, youTubeChannelId);
    }
}
