import { inject, injectable, tagged } from "inversify";
import Tags from "../@Types/Tags";
import Types from "../@Types/Types";
import TwitchStreamBuilder from "../Entities/TwitchStream/TwitchStreamBuilder";
import ITwitchGameSchema from "../Library/Twitch/Schemas/ITwitchGameSchema";
import ITwitchStreamSchema from "../Library/Twitch/Schemas/ITwitchStreamSchema";
import TwitchAPIClient from "../Library/Twitch/TwitchAPIClient";
import TwitchStreamRepository from "../Repositories/TwitchStream/TwitchStreamRepository";
import ITwitchWebhookCallbackData from "./ITwitchWebhookCallbackData";
import WebhookCallbackService from "./WebhookCallbackService";

@injectable()
export default class TwitchWebhookCallbackService extends WebhookCallbackService<ITwitchWebhookCallbackData> {
    constructor(
        @inject(Types.TwitchStreamRepository)
        @tagged(Tags.MONGO, true)
        private twitchStreamRepository: InstanceType<typeof TwitchStreamRepository>,
        @inject(Types.TwitchAPIClient)
        private twitchAPIClient: TwitchAPIClient
    ) {
        super();
    }

    async handleCallback({ userId, streams }: ITwitchWebhookCallbackData): Promise<void> {
        if (this.hasBroadcastStarted(streams)) {
            this.startBroadcast(userId, streams[0]);
        } else {
            this.endBroadcast(userId);
        }
        return;
    }

    private hasBroadcastStarted(streams: ITwitchStreamSchema[]) {
        return streams.length === 1;
    }

    private async startBroadcast(userId: string, stream: ITwitchStreamSchema) {
        const game = await this.getBroadcastedGame(stream);
        const newBroadcast = new TwitchStreamBuilder()
            .setGameName(game.name)
            .setScreenName(stream.user_name)
            .setStartedAt(stream.started_at)
            .setStatus(true)
            .setStreamId(stream.id)
            .setThumbnail(stream.thumbnail_url)
            .setTitle(stream.title)
            .setUrl(`https://www.twitch.tv/${stream.user_name}`)
            .setUserId(userId)
            .setViewers(stream.viewer_count)
            .build();
        await this.twitchStreamRepository.add(newBroadcast);
    }

    private async getBroadcastedGame(stream: ITwitchStreamSchema): Promise<ITwitchGameSchema> {
        const games = await this.twitchAPIClient.games.getGame({
            id: stream.game_id
        });
        return games.getGames()[0];
    }

    private async endBroadcast(userId: string) {
        const liveStreams = await this.twitchStreamRepository.findAllLiveBroadcastsForUser(userId);
        if (liveStreams.length > 0) {
            liveStreams[0].endStream();
            await this.twitchStreamRepository.update(liveStreams[0]);
        }
    }
}
