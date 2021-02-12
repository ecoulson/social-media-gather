import { inject, injectable, tagged } from "inversify";
import Image from "../../Entities/Media/Image";
import Tags from "../../@Types/Tags";
import Types from "../../@Types/Types";
import TwitchStreamBuilder from "../../Entities/TwitchStream/TwitchStreamBuilder";
import ITwitchGameSchema from "../../Libraries/Twitch/Schemas/ITwitchGameSchema";
import ITwitchStreamSchema from "../../Libraries/Twitch/Schemas/ITwitchStreamSchema";
import TwitchAPIClient from "../../Libraries/Twitch/TwitchAPIClient";
import TwitchStreamRepository from "../../Repositories/TwitchStream/TwitchStreamRepository";
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

    async handleCallback({
        channelId,
        streams,
        creatorId
    }: ITwitchWebhookCallbackData): Promise<void> {
        if (this.hasBroadcastStarted(streams)) {
            this.startBroadcast(channelId, creatorId, streams[0]);
        } else {
            this.endBroadcast(channelId);
        }
        return;
    }

    private hasBroadcastStarted(streams: ITwitchStreamSchema[]) {
        return streams.length === 1;
    }

    private async startBroadcast(
        channelId: string,
        creatorId: string,
        stream: ITwitchStreamSchema
    ) {
        const game = await this.getBroadcastedGame(stream);
        const newBroadcast = new TwitchStreamBuilder()
            .setGameName(game.name)
            .setScreenName(stream.user_name)
            .setCreatorId(creatorId)
            .setStartedAt(stream.started_at)
            .setStatus(true)
            .setStreamId(stream.id)
            .setThumbnail(new Image("", stream.thumbnail_url, 0, 0))
            .setTitle(stream.title)
            .setUrl(`https://www.twitch.tv/${stream.user_name}`)
            .setChannelId(channelId)
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
