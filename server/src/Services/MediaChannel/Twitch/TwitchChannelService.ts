import { inject, injectable, tagged } from "inversify";
import TwitchVideoBuilder from "../../../Entities/TwitchVideo/TwitchVideoBuilder";
import Tags from "../../../@Types/Tags";
import Types from "../../../@Types/Types";
import Image from "../../../Entities/Media/Image";
import TwitchStreamBuilder from "../../../Entities/TwitchStream/TwitchStreamBuilder";
import TwitchVideo from "../../../Entities/TwitchVideo/TwitchVideo";
import IUser from "../../../Entities/User/IUser";
import Webhook from "../../../Entities/Webhook/Webhook";
import ITwitchPaginatedResult from "../../../Libraries/Twitch/ITwitchPaginatedResult";
import ITwitchStreamSchema from "../../../Libraries/Twitch/Schemas/ITwitchStreamSchema";
import ITwitchVideoSchema from "../../../Libraries/Twitch/Schemas/ITwitchVideoSchema";
import TwitchAPIClient from "../../../Libraries/Twitch/TwitchAPIClient";
import TwitchStreamRepository from "../../../Repositories/TwitchStream/TwitchStreamRepository";
import TwitchVideoRepository from "../../../Repositories/TwitchVideo/TwitchVideoRepository";
import UserRepository from "../../../Repositories/User/UserRepository";
import WebhookRepository from "../../../Repositories/Webhook/WebhookRepository";
import IMediaPlatformChannelService from "../IMediaChannelService";
import IMediaPlatformChannelSearchResult from "../IMediaPlatformChannelSearchResult";

@injectable()
export default class TwitchChannelService implements IMediaPlatformChannelService {
    private static readonly LEASE_TIME = 60 * 60 * 24 * 7;

    constructor(
        @inject(Types.TwitchAPIClient)
        private twitchApiClient: TwitchAPIClient,
        @inject(Types.UserRepository)
        @tagged(Tags.MONGO, true)
        private userRepository: InstanceType<typeof UserRepository>,
        @inject(Types.TwitchStreamRepository)
        @tagged(Tags.MONGO, true)
        private twitchStreamRepository: InstanceType<typeof TwitchStreamRepository>,
        @inject(Types.TwitchVideoRepository)
        @tagged(Tags.MONGO, true)
        private twitchVideoRepository: InstanceType<typeof TwitchVideoRepository>,
        @inject(Types.WebhookRepository)
        @tagged(Tags.MONGO, true)
        private webhookRepository: InstanceType<typeof WebhookRepository>
    ) {}

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

    async linkChannel(user: IUser, twitchChannelId: string): Promise<void> {
        user.setTwitchId(twitchChannelId);
        if (user.id() === "") {
            this.userRepository.add(user);
        } else {
            this.userRepository.update(user);
        }
        await Promise.all([
            this.createPostForLiveStream(user, twitchChannelId),
            this.createPostForVideos(user, twitchChannelId),
            this.registerWebhooks(user, twitchChannelId)
        ]);
    }

    async createPostForLiveStream(user: IUser, twitchChannelId: string): Promise<void> {
        const usersLiveBroadcasts = await this.twitchApiClient.stream.get({
            user_id: [twitchChannelId]
        });
        if (usersLiveBroadcasts.results().length > 0) {
            const stream = await this.createStreamFromLiveBroadcast(user, usersLiveBroadcasts);
            await this.twitchStreamRepository.add(stream);
        }
    }

    private async createStreamFromLiveBroadcast(
        user: IUser,
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
            .setStatus(true)
            .setStreamId(stream.id)
            .setThumbnail(new Image("", stream.thumbnail_url, 0, 0))
            .setTitle(stream.title)
            .setUrl("")
            .setUserId(user.id())
            .setViewers(stream.viewer_count)
            .build();
    }

    async createPostForVideos(user: IUser, twitchChannelId: string): Promise<void> {
        let videoPage = await this.twitchApiClient.videos.get({
            user_id: [twitchChannelId]
        });
        do {
            if (videoPage.rateLimitRemaining() <= 20) {
                const waitTime = Math.abs(
                    videoPage.rateLimitResetDateTime().getTime() - new Date().getTime()
                );
                await this.wait(waitTime);
            }
            this.createVideosFromPage(user, videoPage.results());
            videoPage = await videoPage.nextPage();
        } while (videoPage.hasNext());
    }

    async wait(milliseconds: number): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(resolve, milliseconds);
        });
    }

    async createVideosFromPage(user: IUser, videosSchemas: ITwitchVideoSchema[]): Promise<void> {
        const twitchVideoBuilder = new TwitchVideoBuilder();
        const videos = videosSchemas.map((videoSchema) => {
            twitchVideoBuilder
                .setId("")
                .setUrl(videoSchema.url)
                .setGameName("")
                .setPublishedAt(new Date(videoSchema.published_at))
                .setTitle(videoSchema.title)
                .setDescription(videoSchema.description)
                .setThumbnail(new Image("", videoSchema.thumbnail_url, 0, 0))
                .setScreenName(videoSchema.user_name)
                .setUserId(user.id())
                .setViews(videoSchema.view_count);
            return twitchVideoBuilder.build();
        });
        videos.forEach((video) => {
            this.twitchVideoRepository.add(video);
        });
    }

    async registerWebhooks(user: IUser, twitchChannelId: string): Promise<void> {
        const expirationDate = new Date();
        expirationDate.setSeconds(expirationDate.getSeconds() + TwitchChannelService.LEASE_TIME);
        const callbackURL = `${await this.twitchApiClient.baseURL()}/api/webhook/twitch/callback?user_id=${user.id()}`;
        const topicURL = `https://api.twitch.tv/helix/streams?user_id=${twitchChannelId}`;
        const webhook = new Webhook(
            "",
            expirationDate,
            new Date(),
            "twitch",
            topicURL,
            callbackURL,
            twitchChannelId,
            user.id()
        );
        this.webhookRepository.add(webhook);
        this.twitchApiClient.webhooks.register({
            callbackURL,
            topicURL,
            mode: "subscribe",
            leaseSeconds: TwitchChannelService.LEASE_TIME
        });
    }

    async linkChannelWithUserId(userId: string, twitchChannelId: string): Promise<void> {
        const user = await this.userRepository.findById(userId);
        return this.linkChannel(user, twitchChannelId);
    }
}
