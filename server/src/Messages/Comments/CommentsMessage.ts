import IComment from "../../Entities/Comment/IComment";
import ICommentsBody from "../Bodies/ICommentsBody";
import ResponseMessage from "../ResponseMessage";
import { v4 as uuid } from "uuid";
import MessageType from "../MessageType";
import CommentJSONSerializer from "../../Serializers/JSON/CommentJSONSerializer";
import IMessage from "../IMessage";

export default class CommentsMessage extends ResponseMessage<ICommentsBody> {
    constructor(comments: IComment[], originalMessage?: IMessage<unknown>) {
        super(
            uuid(),
            MessageType.Comments,
            {
                comments: comments.map((comment) => CommentJSONSerializer(comment))
            },
            originalMessage
        );
    }
}
