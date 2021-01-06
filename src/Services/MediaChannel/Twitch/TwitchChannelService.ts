import { inject, injectable, tagged } from "inversify";
import Tags from "../../../@Types/Tags";
import Types from "../../../@Types/Types";
import Image from "../../../Entities/Media/Image";
import TwitchStreamBuilder from "../../../Entities/TwitchStream/TwitchStreamBuilder";
import TwitchVideo from "../../../Entities/TwitchVideo/TwitchVideo";
import IUser from "../../../Entities/User/IUser";
import Webhook from "../../../Entities/Webhook/Webhook";
import ITwitchPaginatedResult from "../../../Library/Twitch/ITwitchPaginatedResult";
import ITwitchStreamSchema from "../../../Library/Twitch/Schemas/ITwitchStreamSchema";
import ITwitchVideoSchema from "../../../Library/Twitch/Schemas/ITwitchVideoSchema";
import TwitchAPIClient from "../../../Library/Twitch/TwitchAPIClient";
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
            channels: twitchChannelSearchResult.results().map((twitchChannel) => {
                return {
                    id: twitchChannel.id,
                    profilePicture: twitchChannel.thumbnail_url,
                    username: twitchChannel.display_name
                };
            })
        };
    }

    async registerChannel(user: IUser, twitchChannelId: string): Promise<void> {
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
            .setThumbnail(stream.thumbnail_url)
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
        while (videoPage.hasNext()) {
            if (videoPage.rateLimitRemaining() <= 20) {
                const waitTime = Math.abs(
                    videoPage.rateLimitResetDateTime().getTime() - new Date().getTime()
                );
                await this.wait(waitTime);
            }
            this.createVideosFromPage(user, videoPage.results());
            videoPage = await videoPage.nextPage();
        }
    }

    async wait(milliseconds: number): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(resolve, milliseconds);
        });
    }

    async createVideosFromPage(user: IUser, videosSchemas: ITwitchVideoSchema[]): Promise<void> {
        const videos = videosSchemas.map((videoSchema) => {
            return new TwitchVideo(
                "",
                videoSchema.url,
                "",
                new Date(videoSchema.published_at),
                videoSchema.title,
                videoSchema.description,
                new Image("", videoSchema.thumbnail_url, 0, 0),
                videoSchema.user_name,
                user.id()
            );
        });
        videos.forEach((video) => {
            this.twitchVideoRepository.add(video);
        });
    }

    async registerWebhooks(user: IUser, twitchChannelId: string): Promise<void> {
        const expirationDate = new Date();
        expirationDate.setSeconds(expirationDate.getSeconds() + TwitchChannelService.LEASE_TIME);
        const callbackURL = `${this.twitchApiClient.baseURL()}/api/webhook/twitch/callback?user_id=${user.id()}`;
        const topicURL = `https://api.twitch.tv/helix/streams?user_id=${twitchChannelId}`;
        const webhook = new Webhook(
            "",
            expirationDate,
            new Date(),
            topicURL,
            callbackURL,
            "twitch",
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

    async registerChannelForUserId(userId: string, twitchChannelId: string): Promise<void> {
        const user = await this.userRepository.findById(userId);
        return this.registerChannel(user, twitchChannelId);
    }
}
