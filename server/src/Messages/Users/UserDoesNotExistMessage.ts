import IMessageBody from "../Bodies/IMessageBody";
import Message from "../Message";
import MessageType from "../MessageType";
import MetaData from "../MetaData";
import { v4 as uuid } from "uuid";

export default class UserDoesNotExistMessage extends Message<IMessageBody> {
    constructor(username: string) {
        super(new MetaData(uuid(), false, MessageType.UserDoesNotExist), {
            message: `User with username: ${username} does not exist`
        });
    }

    deserialize<T>(): T {
        return (this.body().message as unknown) as T;
    }
}
