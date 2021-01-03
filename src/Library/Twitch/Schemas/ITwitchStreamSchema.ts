export default interface ITwitchStreamSchema {
    id: string;
    user_id: string;
    user_name: string;
    game_id: string;
    community_ids: string[];
    type: string;
    title: string;
    viewer_count: number;
    started_at: Date;
    language: string;
    thumbnail_url: string;
}
