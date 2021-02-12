import ICreateCommentBody from "../Bodies/ICreateCommentBody";
import ResponseMessage from "../ResponseMessage";
import { v4 as uuid } from "uuid";
import MessageType from "../MessageType";
import IMessage from "../IMessage";
import Platform from "../../Entities/Platform/Platform";

export default class CreateCommentMessage extends ResponseMessage<ICreateCommentBody> {
    constructor(postId: string, platform: Platform, originalMessage?: IMessage<unknown>) {
        super(
            uuid(),
            MessageType.CreateComments,
            {
                postId,
                platform
            },
            originalMessage
        );
    }

    deserialize<T>(): T {
        return (this.body() as unknown) as T;
    }
}
