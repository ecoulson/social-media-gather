import IMessageBody from "../Bodies/IMessageBody";
import Message from "../Message";
import MessageType from "../MessageType";
import MetaData from "../MetaData";
import { v4 as uuid } from "uuid";

export default class UserExistsMessage extends Message<IMessageBody> {
    constructor(username: string, email: string) {
        super(new MetaData(uuid(), false, MessageType.UserExists), {
            message: `Username '${username}' or email '${email}' is already taken`
        });
    }

    deserialize<T>(): T {
        return (this.body().message as unknown) as T;
    }
}
