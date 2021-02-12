import IYouTubeCommentSchema from "../Schema/IYouTubeCommentSchema";
import IYouTubeCommentThreadSchema from "../Schema/IYouTubeCommentThreadSchema";
import IYouTubeResponseSchema from "../Schema/IYouTubeResponseSchema";
import YouTubeAPIClient from "../YouTubeAPIClient";
import YouTubePaginatedResult from "../YouTubePaginatedResult";
import IListCommentsOptions from "./IListCommentsOptions";
import IListCommentThreadsOptions from "./IListCommentThreadsOptions";

export default class CommentClient {
    constructor(private youtubeClient: YouTubeAPIClient) {}

    async listThreads(options: IListCommentThreadsOptions) {
        const commentThreadsResponse = await this.youtubeClient.service.commentThreads.list({
            ...options,
            auth: await this.youtubeClient.apiKey()
        });
        return new YouTubePaginatedResult<IYouTubeCommentThreadSchema[]>(
            this.listThreads,
            options,
            commentThreadsResponse.data as IYouTubeResponseSchema<IYouTubeCommentThreadSchema[]>
        );
    }

    async listComments(options: IListCommentsOptions) {
        const commentsResponse = await this.youtubeClient.service.comments.list({
            ...options,
            auth: await this.youtubeClient.apiKey()
        });
        return new YouTubePaginatedResult<IYouTubeCommentSchema[]>(
            this.listComments,
            options,
            commentsResponse.data as IYouTubeResponseSchema<IYouTubeCommentSchema[]>
        );
    }
}
