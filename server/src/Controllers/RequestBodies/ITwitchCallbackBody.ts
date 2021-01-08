import ITwitchStreamSchema from "../../Library/Twitch/Schemas/ITwitchStreamSchema";

export default interface ITwitchCallbackBody {
    data: ITwitchStreamSchema[];
}
