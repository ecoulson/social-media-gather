import { inject, injectable, tagged } from "inversify";
import YouTubeVideoBuilder from "../../../Entities/YouTubeVideo/YouTubeVideoBuilder";
import Tags from "../../../@Types/Tags";
import Types from "../../../@Types/Types";
import Webhook from "../../../Entities/Webhook/Webhook";
import IYouTubePaginatedResult from "../../../Libraries/YouTube/IYouTubePaginatedResult";
import IYouTubeChannelSchema from "../../../Libraries/YouTube/Schema/IYouTubeChannelSchema";
import IYouTubePlaylistSchema from "../../../Libraries/YouTube/Schema/IYouTubePlaylistSchema";
import IYouTubeThumbnailSchema from "../../../Libraries/YouTube/Schema/IYouTubeThumbnailSchema";
import IYouTubeVideoSchema from "../../../Libraries/YouTube/Schema/IYouTubeVideoSchema";
import YouTubeAPIClient from "../../../Libraries/YouTube/YouTubeAPIClient";
import WebhookRepository from "../../../Repositories/Webhook/WebhookRepository";
import YouTubeRepository from "../../../Repositories/YouTubeVideo/YouTubeRepository";
import IMediaPlatformService from "../IMediaPlatformService";
import IMediaPlatformChannelSearchResult from "../IMediaPlatformChannelSearchResult";
import Subscriber from "../../../MessageQueue/Subscriber";
import IMessageQueue from "../../../MessageQueue/IMessageQueue";
import ICreateChannelBody from "../../../Messages/Bodies/ICreateChannelBody";
import IChannel from "../../../Entities/Channel/IChannel";
import CreateChannelMessage from "../../../Messages/Channel/CreateChannelMessage";
import Topic from "../../../MessageQueue/Topic";
import ChannelJSONDeserializer from "../../../Serializers/JSON/ChannelJSONDeserializer";
import IChannelsBody from "../../../Messages/Bodies/IChannelsBody";
import ICreatorJSONSchema from "../../../Schemas/JSON/Creator/ICreatorJSONSchema";
import MessageType from "../../../Messages/MessageType";

@injectable()
export default class YouTubeChannelService extends Subscriber implements IMediaPlatformService {
    private static readonly LEASE_SECONDS = 60 * 60 * 24 * 7;

    constructor(
        @inject(Types.YouTubeAPIClient) private youTubeAPIClient: YouTubeAPIClient,
        @inject(Types.YouTubeVideoRepository)
        @tagged(Tags.MONGO, true)
        private youTubeVideoRepository: InstanceType<typeof YouTubeRepository>,
        @inject(Types.WebhookRepository)
        @tagged(Tags.MONGO, true)
        private webhookRepository: InstanceType<typeof WebhookRepository>,
        @inject(Types.MessageQueue) messageQueue: IMessageQueue
    ) {
        super(messageQueue);
    }

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

    async createChannel(createChannelBody: ICreateChannelBody, creator: ICreatorJSONSchema) {
        const channelResponse = await this.query<IChannelsBody>(
            Topic.Channel,
            MessageType.Channels,
            new CreateChannelMessage(createChannelBody)
        );
        const channel = ChannelJSONDeserializer(channelResponse.body().channels[0]);
        this.createPosts(channel, creator);
        return channel;
    }

    private async createPosts(channel: IChannel, creator: ICreatorJSONSchema): Promise<void> {
        try {
            this.createYoutubePosts(channel, creator);
            this.registerWebhook(channel, creator);
        } catch (error) {
            console.log(error);
        }
    }

    private async createYoutubePosts(channel: IChannel, creator: ICreatorJSONSchema) {
        const youTubeChannels = await this.youTubeAPIClient.channels.get({
            ids: [channel.platformId()]
        });
        let uploadPage = await this.getUploads(youTubeChannels[0]);
        do {
            const videos = await this.getUploadedVideosOnPage(uploadPage);
            this.createYouTubeVideoPosts(channel, videos, creator);
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

    private async createYouTubeVideoPosts(
        channel: IChannel,
        videos: IYouTubeVideoSchema[],
        creator: ICreatorJSONSchema
    ) {
        const youTubeVideoBuilder = new YouTubeVideoBuilder();
        const videoPosts = videos.map((video) =>
            youTubeVideoBuilder
                .setId("")
                .setPublishedAt(new Date(video.snippet.publishedAt))
                .setThumbnailUrl(this.getThumbnail(video.snippet.thumbnails))
                .setTitle(video.snippet.title)
                .setCreatorId(creator.id)
                .setVideoId(video.id)
                .setChannelId(channel.id())
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

    private async registerWebhook(channel: IChannel, creator: ICreatorJSONSchema) {
        const expirationDate = new Date();
        expirationDate.setSeconds(
            expirationDate.getSeconds() + YouTubeChannelService.LEASE_SECONDS
        );
        const webhook = new Webhook(
            "",
            expirationDate,
            new Date(),
            "youtube",
            `https://www.youtube.com/xml/feeds/videos.xml?channel_id=${channel.platformId()}`,
            `${await this.youTubeAPIClient.baseUrl()}/api/webhook/youtube/callback?channelId=${channel.id()}&creatorId=${
                creator.id
            }`,
            channel.platformId(),
            channel.id()
        );
        this.youTubeAPIClient.webhooks.register({
            mode: "subscribe",
            callback: webhook.callbackUrl(),
            verify: "async",
            topic: webhook.topicUrl()
        });
        this.webhookRepository.add(webhook);
    }
}
