import IYouTubeAuthorChannelId from "./IYouTubeAuthorChannelId";

export default interface IYouTubeCommentSnippetSchema {
    authorChannelId?: IYouTubeAuthorChannelId;
    authorChannelUrl?: string | null;
    authorDisplayName?: string | null;
    authorProfileImageUrl?: string | null;
    canRate?: boolean | null;
    channelId?: string | null;
    likeCount?: number | null;
    moderationStatus?: string | null;
    parentId?: string | null;
    publishedAt?: string | null;
    textDisplay?: string | null;
    textOriginal?: string | null;
    updatedAt?: string | null;
    videoId?: string | null;
    viewerRating?: string | null;
}
