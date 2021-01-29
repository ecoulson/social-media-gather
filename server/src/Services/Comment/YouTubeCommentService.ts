import { inject, injectable, tagged } from "inversify";
import Tags from "../../@Types/Tags";
import Types from "../../@Types/Types";
import CommentBuilder from "../../Entities/Comment/CommentBuilder";
import IComment from "../../Entities/Comment/IComment";
import Image from "../../Entities/Media/Image";
import IYouTubeVideo from "../../Entities/YouTubeVideo/IYouTubeVideo";
import IYouTubeCommentThreadSchema from "../../Libraries/YouTube/Schema/IYouTubeCommentThreadSchema";
import YouTubeAPIClient from "../../Libraries/YouTube/YouTubeAPIClient";
import IMessageQueue from "../../MessageQueue/IMessageQueue";
import Subscriber from "../../MessageQueue/Subscriber";
import Topic from "../../MessageQueue/Topic";
import IPostsBody from "../../Messages/Bodies/IPostsBody";
import MessageType from "../../Messages/MessageType";
import GetPostsMessage from "../../Messages/Posts/GetPostsMessage";
import CommentRepository from "../../Repositories/Comment/CommentRepository";
import PostJSONDeserializer from "../../Serializers/JSON/PostJSONDeserializer";
import ICommentService from "./ICommentService";

@injectable()
export default class YouTubeCommentService extends Subscriber implements ICommentService {
    constructor(
        @inject(Types.YouTubeAPIClient) private youtubeAPIClient: YouTubeAPIClient,
        @inject(Types.CommentsRepository)
        @tagged(Tags.MONGO, true)
        private commentsRepository: InstanceType<typeof CommentRepository>,
        @inject(Types.MessageQueue) messageQueue: IMessageQueue
    ) {
        super(messageQueue);
    }

    async loadCommentsFromMedia(postId: string): Promise<IComment[]> {
        const post = await this.getPostFById(postId);
        const comments = await this.getCommentsFromYouTube(post);
        return await this.commentsRepository.addAll(comments);
    }

    private async getPostFById(postId: string) {
        const postsMessage = await this.query<IPostsBody>(
            Topic.Posts,
            MessageType.Posts,
            new GetPostsMessage([postId])
        );
        return PostJSONDeserializer(postsMessage.data().posts[0]) as IYouTubeVideo;
    }

    private async getCommentsFromYouTube(youtubeVideo: IYouTubeVideo) {
        const commentThreadsResponse = await this.youtubeAPIClient.comments.listThreads({
            videoId: youtubeVideo.videoId(),
            part: ["snippet", "replies"]
        });
        const comments = commentThreadsResponse
            .items()
            .map((commentThread) => this.buildComment(youtubeVideo.id(), commentThread));
        return comments;
    }

    private buildComment(postId: string, commentThread: IYouTubeCommentThreadSchema): IComment {
        const commentBuilder = new CommentBuilder();
        commentBuilder
            .setDateCreated(new Date(commentThread.snippet.topLevelComment.snippet.publishedAt))
            .setDislikes(0)
            .setLikes(commentThread.snippet.topLevelComment.snippet.likeCount)
            .setPostId(postId)
            .setProfileImage(
                new Image(
                    "",
                    commentThread.snippet.topLevelComment.snippet.authorProfileImageUrl,
                    0,
                    0
                )
            )
            .setReplyCount(commentThread.snippet.totalReplyCount)
            .setText(commentThread.snippet.topLevelComment.snippet.textDisplay)
            .setUsername(commentThread.snippet.topLevelComment.snippet.authorDisplayName);
        return commentBuilder.build();
    }

    getComments(postId: string, offset: number): Promise<IComment[]> {
        return this.commentsRepository.find({
            where: {
                postId
            },
            skip: offset,
            limit: 10
        });
    }
}
