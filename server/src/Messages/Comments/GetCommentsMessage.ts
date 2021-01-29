import IGetCommentsBody from "../Bodies/IGetCommentsBody";
import ResponseMessage from "../ResponseMessage";
import { v4 as uuid } from "uuid";
import MessageType from "../MessageType";
import IMessage from "../IMessage";
import Platform from "../../Entities/Platform/Platform";

export default class GetCommentsMessage extends ResponseMessage<IGetCommentsBody> {
    constructor(
        platform: Platform,
        postId: string,
        offset: number,
        originalMessage?: IMessage<unknown>
    ) {
        super(
            uuid(),
            MessageType.GetComments,
            {
                postId,
                offset,
                platform
            },
            originalMessage
        );
    }
}
