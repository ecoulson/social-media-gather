import IMessageBody from "../Bodies/IMessageBody";
import Message from "../Message";
import MessageType from "../MessageType";
import MetaData from "../MetaData";
import { v4 as uuid } from "uuid";

export default class DeletedUserMessage extends Message<IMessageBody> {
    constructor(deletedUserId: string) {
        super(new MetaData(uuid(), true, MessageType.DeletedUser), {
            message: `Deleted user id@${deletedUserId}`
        });
    }

    deserialize<T>(): T {
        return (this.body().message as unknown) as T;
    }
}
