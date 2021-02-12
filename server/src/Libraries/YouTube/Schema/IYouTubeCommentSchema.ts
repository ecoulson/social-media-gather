import IYouTubeCommentSnippetSchema from "./IYouTubeCommentSnippetSchema";

export default interface IYouTubeCommentSchema {
    etag?: string | null;
    id?: string | null;
    kind?: string | null;
    snippet?: IYouTubeCommentSnippetSchema;
}
