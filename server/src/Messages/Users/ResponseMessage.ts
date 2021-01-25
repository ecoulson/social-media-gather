import IMessageJSONSchema from "../../Schemas/JSON/Message/IMessageJSONSchema";
import IMetaData from "../IMetaData";
import IResponseMessage from "../IResponseMessage";
import Message from "../Message";
import MessageType from "../MessageType";
import MetaData from "../MetaData";

export default class ResponseMessage<T> extends Message<T> implements IResponseMessage<T> {
    constructor(id: string, private _originalMessageId: string, data: T) {
        super(new MetaData(id, true, MessageType.Response), data);
    }

    originalMessageId(): string {
        return this._originalMessageId;
    }
}
