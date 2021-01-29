import ICreateChannelBody from "../Bodies/ICreateChannelBody";
import Message from "../Message";
import MessageType from "../MessageType";
import MetaData from "../MetaData";
import { v4 as uuid } from "uuid";

export default class CreateChannelMessage extends Message<ICreateChannelBody> {
    constructor(body: ICreateChannelBody) {
        super(new MetaData(uuid(), true, MessageType.CreateChannel), body);
    }

    deserialize<T>(): T {
        return (this.body() as unknown) as T;
    }
}
