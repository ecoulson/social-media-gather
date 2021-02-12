import IYouTubeCommentSchema from "./IYouTubeCommentSchema";

export default interface IYouTubeCommentThreadSnippetSchema {
    canReply?: boolean | null;
    channelId?: string | null;
    isPublic?: boolean | null;
    topLevelComment?: IYouTubeCommentSchema;
    totalReplyCount?: number | null;
    videoId?: string | null;
}
