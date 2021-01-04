import ITwitchStreamSchema from "../../Library/Twitch/Schemas/ITwitchStreamSchema";

export default interface ITwitchWebhookCallbackData {
    userId: string;
    streams: ITwitchStreamSchema[];
}
