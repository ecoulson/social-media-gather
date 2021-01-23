import ITwitchFollowSchema from "./ITwitchFollowSchema";

export default interface ITwitchFollowResultSchema {
    total: number;
    follows: ITwitchFollowSchema[];
}
