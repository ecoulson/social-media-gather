import ITwitchGameSchema from "./ITwitchGameSchema";
import ITwitchPaginationSchema from "./ITwitchPaginationSchema";

export default interface ITwitchGameResponseSchema {
    data: ITwitchGameSchema[];
    pagination: ITwitchPaginationSchema;
}
