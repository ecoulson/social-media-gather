import IMessage from "./IMessage";
import IResponseMessage from "./IResponseMessage";
import Message from "./Message";
import MessageType from "./MessageType";
import MetaData from "./MetaData";

export default class ResponseMessage<T> extends Message<T> implements IResponseMessage<T> {
    constructor(
        id: string,
        type: MessageType,
        data: T,
        private _originalMessage: IMessage<unknown> = null
    ) {
        super(new MetaData(id, true, type, true), data);
    }

    originalMessageId(): string {
        return this._originalMessage.metadata().id();
    }
}
