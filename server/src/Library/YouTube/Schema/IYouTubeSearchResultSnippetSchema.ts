import IYouTubeImageSchema from "./IYouTubeImageSchema";

export default interface IYouTubeSearchResultSnippetSchema {
    channelId?: string | null;
    channelTitle?: string | null;
    description?: string | null;
    liveBroadcastContent?: string | null;
    publishedAt?: string | null;
    thumbnails?: { [key: string]: IYouTubeImageSchema };
    title?: string | null;
}
