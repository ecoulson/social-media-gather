import { inject, injectable } from "inversify";
import Types from "../../@Types/Types";
import Platform from "../../Entities/Platform/Platform";
import IMessageQueue from "../../MessageQueue/IMessageQueue";
import Subscriber from "../../MessageQueue/Subscriber";
import Topic from "../../MessageQueue/Topic";
import IPostsBody from "../../Messages/Bodies/IPostsBody";
import CommentsMessage from "../../Messages/Comments/CommentsMessage";
import CreateCommentMessage from "../../Messages/Comments/CreateCommentMessage";
import GetCommentsMessage from "../../Messages/Comments/GetCommentsMessage";
import MessageType from "../../Messages/MessageType";
import ICommentService from "../../Services/Comment/ICommentService";

@injectable()
export default class CommentSubscriber extends Subscriber {
    constructor(
        @inject(Types.MessageQueue) messageQueue: IMessageQueue,
        @inject(Types.CommentServiceMap) private commentServiceMap: Map<Platform, ICommentService>
    ) {
        super(messageQueue);

        this.subscribe(Topic.Comments, MessageType.CreateComments, this.handleCreateComments);
        this.subscribe(Topic.Comments, MessageType.GetComments, this.handleGetComments);
    }

    async handleGetComments(message: GetCommentsMessage) {
        const { platform, postId, offset } = message.data();
        const comments = await this.commentServiceMap.get(platform).getComments(postId, offset);
        this.publish(Topic.Comments, new CommentsMessage(comments, message));
    }

    async handleCreateComments(message: CreateCommentMessage) {
        const { platform, postId } = message.data();
        const comments = await this.commentServiceMap.get(platform).loadCommentsFromMedia(postId);
        this.publish(Topic.Comments, new CommentsMessage(comments, message));
    }
}
