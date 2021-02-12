import { MediaCommentsFeedResponseCommentsItem } from "instagram-private-api";
import { inject, injectable } from "inversify";
import Types from "../../@Types/Types";
import CommentBuilder from "../../Entities/Comment/CommentBuilder";
import IComment from "../../Entities/Comment/IComment";
import IInstagramPost from "../../Entities/InstagramPost/IInstagramPost";
import Image from "../../Entities/Media/Image";
import InstagramAPIClient from "../../Libraries/Instagram/InstagramAPIClient";
import IMessageQueue from "../../MessageQueue/IMessageQueue";
import Subscriber from "../../MessageQueue/Subscriber";
import Topic from "../../MessageQueue/Topic";
import IPostsBody from "../../Messages/Bodies/IPostsBody";
import MessageType from "../../Messages/MessageType";
import GetPostsMessage from "../../Messages/Posts/GetPostsMessage";
import UpdatePostsMessage from "../../Messages/Posts/UpdatePostsMessage";
import CommentRepository from "../../Repositories/Comment/CommentRepository";
import ICommentService from "./ICommentService";

@injectable()
export default class InstagramCommentService extends Subscriber implements ICommentService {
    constructor(
        @inject(Types.MessageQueue) messageQueue: IMessageQueue,
        @inject(Types.CommentsRepository)
        private commentsRepository: InstanceType<typeof CommentRepository>,
        @inject(Types.InstagramAPIClient)
        private instagramAPI: InstagramAPIClient
    ) {
        super(messageQueue);
    }

    async getComments(instagramPostId: string, offset: number): Promise<IComment[]> {
        const posts = await this.getInstagramPosts(instagramPostId);
        if (await this.shouldLoadComments(posts, offset)) {
            return await this.loadCommentsFromMedia(instagramPostId);
        }
        return this.commentsRepository.find({
            where: {
                postId: instagramPostId
            },
            skip: offset,
            limit: 10
        });
    }

    private async shouldLoadComments(posts: IInstagramPost[], offset: number) {
        const postCommentCount = await this.getPostCommentCount(posts);
        return posts[0].commentCount() > postCommentCount && offset >= postCommentCount;
    }

    private async getPostCommentCount(posts: IInstagramPost[]) {
        return (
            await this.commentsRepository.find({
                where: {
                    postId: posts[0].id()
                }
            })
        ).length;
    }

    private async getInstagramPosts(instagramPostsId: string) {
        return (
            await this.query<IPostsBody>(
                Topic.Posts,
                MessageType.Posts,
                new GetPostsMessage([instagramPostsId])
            )
        ).deserialize<IInstagramPost[]>();
    }

    async loadCommentsFromMedia(postId: string): Promise<IComment[]> {
        const post = await this.getPostById(postId);
        const comments = await this.getCommentsFromInstagram(post);
        return await this.commentsRepository.addAll(comments);
    }

    private async getCommentsFromInstagram(instagramPost: IInstagramPost) {
        let commentsFeed = await this.instagramAPI
            .client()
            .feed.mediaComments(instagramPost.postId());
        if (instagramPost.commentCursor()) {
            commentsFeed.deserialize(instagramPost.commentCursor());
        }
        const comments = await commentsFeed.items();
        instagramPost.setCommentCursor(commentsFeed.serialize());
        await this.query(Topic.Posts, MessageType.Posts, new UpdatePostsMessage([instagramPost]));
        return comments.map((comment) => this.buildComment(instagramPost, comment));
    }

    private buildComment(
        post: IInstagramPost,
        comment: MediaCommentsFeedResponseCommentsItem
    ): IComment {
        const commentBuilder = new CommentBuilder();
        commentBuilder
            .setDateCreated(new Date(comment.created_at * 1000))
            .setDislikes(0)
            .setId(comment.pk)
            .setInReplyToId(null)
            .setLikes(0)
            .setPostId(post.id())
            .setProfileImage(
                new Image(comment.user.profile_pic_id, comment.user.profile_pic_url, 0, 0)
            )
            .setReplyCount(comment.num_tail_child_comments)
            .setText(comment.text)
            .setUsername(comment.user.username);
        return commentBuilder.build();
    }

    private async getPostById(postId: string) {
        const postsMessage = await this.query<IPostsBody>(
            Topic.Posts,
            MessageType.Posts,
            new GetPostsMessage([postId])
        );
        return postsMessage.deserialize<IInstagramPost[]>()[0];
    }
}
