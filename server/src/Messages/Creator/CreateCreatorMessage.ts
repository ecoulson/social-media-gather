import ICreateCreatorBody from "../Bodies/ICreateCreatorBody";
import Message from "../Message";
import MetaData from "../MetaData";
import { v4 as uuid } from "uuid";
import MessageType from "../MessageType";

export default class CreateCreatorMessage extends Message<ICreateCreatorBody> {
    constructor(body: ICreateCreatorBody) {
        super(new MetaData(uuid(), true, MessageType.CreateCreator), body);
    }

    deserialize<T>(): T {
        return (this.body() as unknown) as T;
    }
}
