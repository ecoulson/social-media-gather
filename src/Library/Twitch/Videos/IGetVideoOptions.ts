export default interface IGetVideoOptions {
    id?: string[];
    user_id?: string[];
    game_id?: string[];
    after?: string;
    before?: string;
    first?: string;
    period?: "all" | "day" | "week" | "month" | "all";
    sort?: "time" | "trending" | "views";
    type?: "all" | "upload" | "archive" | "highlight";
}
