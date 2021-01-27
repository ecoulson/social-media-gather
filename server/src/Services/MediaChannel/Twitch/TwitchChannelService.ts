import { inject, injectable, tagged } from "inversify";
import TwitchVideoBuilder from "../../../Entities/TwitchVideo/TwitchVideoBuilder";
import Tags from "../../../@Types/Tags";
import Types from "../../../@Types/Types";
import Image from "../../../Entities/Media/Image";
import TwitchStreamBuilder from "../../../Entities/TwitchStream/TwitchStreamBuilder";
import Webhook from "../../../Entities/Webhook/Webhook";
import ITwitchPaginatedResult from "../../../Libraries/Twitch/ITwitchPaginatedResult";
import ITwitchStreamSchema from "../../../Libraries/Twitch/Schemas/ITwitchStreamSchema";
import ITwitchVideoSchema from "../../../Libraries/Twitch/Schemas/ITwitchVideoSchema";
import TwitchAPIClient from "../../../Libraries/Twitch/TwitchAPIClient";
import TwitchStreamRepository from "../../../Repositories/TwitchStream/TwitchStreamRepository";
import TwitchVideoRepository from "../../../Repositories/TwitchVideo/TwitchVideoRepository";
import WebhookRepository from "../../../Repositories/Webhook/WebhookRepository";
import IMediaPlatformService from "../IMediaPlatformService";
import IMediaPlatformChannelSearchResult from "../IMediaPlatformChannelSearchResult";
import IChannel from "../../../Entities/Channel/IChannel";
import CreateChannelMessage from "../../../Messages/Channel/CreateChannelMessage";
import ICreateChannelBody from "../../../Messages/Bodies/ICreateChannelBody";
import Topic from "../../../MessageQueue/Topic";
import ChannelJSONDeserializer from "../../../Serializers/JSON/ChannelJSONDeserializer";
import Subscriber from "../../../MessageQueue/Subscriber";
import IMessageQueue from "../../../MessageQueue/IMessageQueue";
import IChannelsBody from "../../../Messages/Bodies/IChannelsBody";
import ICreatorJSONSchema from "../../../Schemas/JSON/Creator/ICreatorJSONSchema";
import MessageType from "../../../Messages/MessageType";

@injectable()
export default class TwitchChannelService extends Subscriber implements IMediaPlatformService {
    private static readonly LEASE_TIME = 60 * 60 * 24 * 7;

    constructor(
        @inject(Types.TwitchAPIClient)
        private twitchApiClient: TwitchAPIClient,
        @inject(Types.TwitchStreamRepository)
        @tagged(Tags.MONGO, true)
        private twitchStreamRepository: InstanceType<typeof TwitchStreamRepository>,
        @inject(Types.TwitchVideoRepository)
        @tagged(Tags.MONGO, true)
        private twitchVideoRepository: InstanceType<typeof TwitchVideoRepository>,
        @inject(Types.WebhookRepository)
        @tagged(Tags.MONGO, true)
        private webhookRepository: InstanceType<typeof WebhookRepository>,
        @inject(Types.MessageQueue) messageQueue: IMessageQueue
    ) {
        super(messageQueue);
    }

    async searchPlatformForChannel(username: string): Promise<IMediaPlatformChannelSearchResult> {
        const twitchChannelSearchResult = await this.twitchApiClient.channels.search({
            query: username
        });
        return {
            channels: await Promise.all(
                twitchChannelSearchResult.results().map(async (twitchChannel) => {
                    const followers = await this.twitchApiClient.follows.get({
                        to_id: twitchChannel.id
                    });
                    return {
                        id: twitchChannel.id,
                        profilePicture: twitchChannel.thumbnail_url,
                        username: twitchChannel.display_name,
                        subscriberCount: followers.results().total
                    };
                })
            )
        };
    }

    async createChannel(
        createChannelBody: ICreateChannelBody,
        creator: ICreatorJSONSchema
    ): Promise<IChannel> {
        const channelResponse = await this.query<IChannelsBody>(
            Topic.Channel,
            MessageType.Channels,
            new CreateChannelMessage(createChannelBody)
        );
        const channel = ChannelJSONDeserializer(channelResponse.data().channels[0]);
        this.createPosts(channel, creator);
        return channel;
    }

    async createPosts(channel: IChannel, creator: ICreatorJSONSchema): Promise<void> {
        await Promise.all([
            this.createPostForLiveStream(channel, creator),
            this.createPostForVideos(channel, creator),
            this.registerWebhooks(channel, creator)
        ]);
    }

    async createPostForLiveStream(channel: IChannel, creator: ICreatorJSONSchema): Promise<void> {
        const usersLiveBroadcasts = await this.twitchApiClient.stream.get({
            user_id: [channel.platformId()]
        });
        if (usersLiveBroadcasts.results().length > 0) {
            const stream = await this.createStreamFromLiveBroadcast(
                channel,
                creator,
                usersLiveBroadcasts
            );
            await this.twitchStreamRepository.add(stream);
        }
    }

    private async createStreamFromLiveBroadcast(
        channel: IChannel,
        creator: ICreatorJSONSchema,
        usersLiveBroadcasts: ITwitchPaginatedResult<ITwitchStreamSchema[]>
    ) {
        const stream = usersLiveBroadcasts.results()[0];
        const game = await this.twitchApiClient.games.getGame({
            id: stream.game_id
        });
        return new TwitchStreamBuilder()
            .setGameName(game.getGames()[0].name)
            .setScreenName(stream.user_name)
            .setStartedAt(stream.started_at)
            .setCreatorId(creator.id)
            .setStatus(true)
            .setStreamId(stream.id)
            .setThumbnail(new Image("", stream.thumbnail_url, 0, 0))
            .setTitle(stream.title)
            .setUrl("")
            .setChannelId(channel.id())
            .setViewers(stream.viewer_count)
            .build();
    }

    async createPostForVideos(channel: IChannel, creator: ICreatorJSONSchema): Promise<void> {
        let videoPage = await this.twitchApiClient.videos.get({
            user_id: [channel.platformId()]
        });
        do {
            if (videoPage.rateLimitRemaining() <= 20) {
                const waitTime = Math.abs(
                    videoPage.rateLimitResetDateTime().getTime() - new Date().getTime()
                );
                await this.wait(waitTime);
            }
            this.createVideosFromPage(channel, creator, videoPage.results());
            videoPage = await videoPage.nextPage();
        } while (videoPage.hasNext());
    }

    async wait(milliseconds: number): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(resolve, milliseconds);
        });
    }

    async createVideosFromPage(
        channel: IChannel,
        creator: ICreatorJSONSchema,
        videosSchemas: ITwitchVideoSchema[]
    ): Promise<void> {
        const twitchVideoBuilder = new TwitchVideoBuilder();
        const videos = videosSchemas.map((videoSchema) => {
            twitchVideoBuilder
                .setId("")
                .setCreatorId(creator.id)
                .setUrl(videoSchema.url)
                .setGameName("")
                .setPublishedAt(new Date(videoSchema.published_at))
                .setTitle(videoSchema.title)
                .setDescription(videoSchema.description)
                .setThumbnail(new Image("", videoSchema.thumbnail_url, 0, 0))
                .setScreenName(videoSchema.user_name)
                .setChannelId(channel.id())
                .setViews(videoSchema.view_count);
            return twitchVideoBuilder.build();
        });
        videos.forEach((video) => {
            this.twitchVideoRepository.add(video);
        });
    }

    async registerWebhooks(channel: IChannel, creator: ICreatorJSONSchema): Promise<void> {
        const expirationDate = new Date();
        expirationDate.setSeconds(expirationDate.getSeconds() + TwitchChannelService.LEASE_TIME);
        const callbackURL = `${await this.twitchApiClient.baseURL()}/api/webhook/twitch/callback?channelId=${channel.id()}&creatorId=${
            creator.id
        }`;
        const topicURL = `https://api.twitch.tv/helix/streams?user_id=${channel.platformId()}`;
        const webhook = new Webhook(
            "",
            expirationDate,
            new Date(),
            "twitch",
            topicURL,
            callbackURL,
            channel.platformId(),
            channel.id()
        );
        this.webhookRepository.add(webhook);
        this.twitchApiClient.webhooks.register({
            callbackURL,
            topicURL,
            mode: "subscribe",
            leaseSeconds: TwitchChannelService.LEASE_TIME
        });
    }
}
