import ITwitchStreamSchema from "../../Libraries/Twitch/Schemas/ITwitchStreamSchema";

export default interface ITwitchWebhookCallbackData {
    userId: string;
    streams: ITwitchStreamSchema[];
}
