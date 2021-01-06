export default interface ITwitchStreamSchema {
    community_ids: string[];
    game_id: string;
    game_name: string;
    id: string;
    language: string;
    started_at: Date;
    title: string;
    thumbnail_url: string;
    type: string;
    user_name: string;
    user_id: string;
    viewer_count: number;
}
