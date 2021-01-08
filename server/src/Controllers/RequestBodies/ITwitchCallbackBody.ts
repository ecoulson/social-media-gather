import ITwitchStreamSchema from "../../Libraries/Twitch/Schemas/ITwitchStreamSchema";

export default interface ITwitchCallbackBody {
    data: ITwitchStreamSchema[];
}
