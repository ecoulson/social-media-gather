import { inject, injectable, tagged } from "inversify";
import YouTubeVideoBuilder from "../../../Entities/YouTubeVideo/YouTubeVideoBuilder";
import Tags from "../../../@Types/Tags";
import Types from "../../../@Types/Types";
import IUser from "../../../Entities/User/IUser";
import Webhook from "../../../Entities/Webhook/Webhook";
import IYouTubePaginatedResult from "../../../Libraries/YouTube/IYouTubePaginatedResult";
import IYouTubeChannelSchema from "../../../Libraries/YouTube/Schema/IYouTubeChannelSchema";
import IYouTubePlaylistSchema from "../../../Libraries/YouTube/Schema/IYouTubePlaylistSchema";
import IYouTubeThumbnailSchema from "../../../Libraries/YouTube/Schema/IYouTubeThumbnailSchema";
import IYouTubeVideoSchema from "../../../Libraries/YouTube/Schema/IYouTubeVideoSchema";
import YouTubeAPIClient from "../../../Libraries/YouTube/YouTubeAPIClient";
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
        const channelSearch = await this.youTubeAPIClient.channels.searchChannels(username);
        const channels = await this.youTubeAPIClient.channels.get({
            ids: channelSearch.map((channelSearchResult) => channelSearchResult.id.channelId)
        });
        return {
            channels: channels.map((channel) => {
                return {
                    id: channel.id,
                    username: channel.snippet.title,
                    profilePicture: channel.snippet.thumbnails.default.url,
                    subscriberCount: parseInt(channel.statistics.subscriberCount)
                };
            })
        };
    }

    async linkChannel(user: IUser, youTubeChannelId: string): Promise<void> {
        user.setYouTubeId(youTubeChannelId);
        if (user.id() === "") {
            this.userRepository.add(user);
        } else {
            this.userRepository.update(user);
        }
        try {
            this.createYoutubePosts(user, youTubeChannelId);
            this.registerWebhook(user, youTubeChannelId);
        } catch (error) {
            console.log(error);
        }
    }

    private async createYoutubePosts(user: IUser, youTubeChannelId: string) {
        const youTubeChannels = await this.youTubeAPIClient.channels.get({
            ids: [youTubeChannelId]
        });
        let uploadPage = await this.getUploads(youTubeChannels[0]);
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
        const youTubeVideoBuilder = new YouTubeVideoBuilder();
        const videoPosts = videos.map((video) =>
            youTubeVideoBuilder
                .setId("")
                .setPublishedAt(new Date(video.snippet.publishedAt))
                .setThumbnailUrl(this.getThumbnail(video.snippet.thumbnails))
                .setTitle(video.snippet.title)
                .setVideoId(video.id)
                .setUserId(user.id())
                .setLikes(this.parseStatistic(video.statistics.likeCount))
                .setDislikes(this.parseStatistic(video.statistics.dislikeCount))
                .setCommentCount(this.parseStatistic(video.statistics.commentCount))
                .setViews(this.parseStatistic(video.statistics.viewCount))
                .build()
        );
        videoPosts.forEach((videoPost) => this.youTubeVideoRepository.add(videoPost));
    }

    private parseStatistic(statistic: string): number {
        const value = parseInt(statistic);
        return isNaN(value) ? 0 : value;
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
            `${await this.youTubeAPIClient.baseUrl()}/api/webhook/youtube/callback?userId=${user.id()}`,
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

    async linkChannelWithUserId(userId: string, youTubeChannelId: string): Promise<void> {
        const user = await this.userRepository.findById(userId);
        this.linkChannel(user, youTubeChannelId);
    }
}
