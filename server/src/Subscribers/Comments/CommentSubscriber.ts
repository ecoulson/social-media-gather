import { inject, injectable } from "inversify";
import Types from "../../@Types/Types";
import IMessageQueue from "../../MessageQueue/IMessageQueue";
import Subscriber from "../../MessageQueue/Subscriber";
import Topic from "../../MessageQueue/Topic";
import CommentsMessage from "../../Messages/Comments/CommentsMessage";
import CreateCommentMessage from "../../Messages/Comments/CreateCommentMessage";
import MessageType from "../../Messages/MessageType";
import ICommentService from "../../Services/Comment/ICommentService";

@injectable()
export default class CommentSubscriber extends Subscriber {
    constructor(
        @inject(Types.MessageQueue) messageQueue: IMessageQueue,
        @inject(Types.YouTubeCommentsService) private youTubeCommentsService: ICommentService
    ) {
        super(messageQueue);

        this.subscribe(Topic.Comments, MessageType.CreateComments, this.handleCreateComments);
    }

    async handleCreateComments(message: CreateCommentMessage) {
        const comments = await this.youTubeCommentsService.loadCommentsFromMedia(
            message.data().postId
        );
        this.publish(Topic.Comments, new CommentsMessage(comments, message));
    }
}
