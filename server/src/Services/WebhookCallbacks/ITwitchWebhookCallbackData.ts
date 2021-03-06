import ITwitchStreamSchema from "../../Libraries/Twitch/Schemas/ITwitchStreamSchema";

export default interface ITwitchWebhookCallbackData {
    channelId: string;
    creatorId: string;
    streams: ITwitchStreamSchema[];
}
