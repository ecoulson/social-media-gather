import IYouTubeResourceIdSchema from "./IYouTubeResourceIdSchema";
import IYouTubeSearchResultSnippetSchema from "./IYouTubeSearchResultSnippetSchema";

export default interface IYouTubeSearchResultSchema {
    etag: string;
    id: IYouTubeResourceIdSchema;
    kind: string;
    snippet: IYouTubeSearchResultSnippetSchema;
}
