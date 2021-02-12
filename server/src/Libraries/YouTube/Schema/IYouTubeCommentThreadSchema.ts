import IYouTubeCommentThreadRepliesSchema from "./IYouTubeCommentThreadRepliesSchema";
import IYouTubeCommentThreadSnippetSchema from "./IYouTubeCommentThreadSnippetSchema";

export default interface IYouTubeCommentThreadSchema {
    etag?: string | null;
    id?: string | null;
    kind?: string | null;
    replies?: IYouTubeCommentThreadRepliesSchema;
    snippet?: IYouTubeCommentThreadSnippetSchema;
}
