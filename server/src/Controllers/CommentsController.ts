import { controller, httpPost, requestParam } from "inversify-express-utils";
import Platform from "../Entities/Platform/Platform";
import Subscriber from "../MessageQueue/Subscriber";
import Topic from "../MessageQueue/Topic";
import ICommentsBody from "../Messages/Bodies/ICommentsBody";
import CommentsMessage from "../Messages/Comments/CommentsMessage";
import CreateCommentMessage from "../Messages/Comments/CreateCommentMessage";
import MessageType from "../Messages/MessageType";

@controller("/api/comments")
export default class CommentsController extends Subscriber {
    @httpPost("/youtube/:postId")
    async createComments(@requestParam("postId") postId: string) {
        return await this.query<ICommentsBody>(
            Topic.Comments,
            MessageType.Comments,
            new CreateCommentMessage(postId, Platform.YOUTUBE)
        );
    }
}
