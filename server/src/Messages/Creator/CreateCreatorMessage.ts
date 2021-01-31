import ICreateCreatorBody from "../Bodies/ICreateCreatorBody";
import { v4 as uuid } from "uuid";
import MessageType from "../MessageType";
import ResponseMessage from "../ResponseMessage";
import IMessage from "../IMessage";

export default class CreateCreatorMessage extends ResponseMessage<ICreateCreatorBody> {
    constructor(body: ICreateCreatorBody, originalMessage?: IMessage<unknown>) {
        super(uuid(), MessageType.CreateCreator, body, originalMessage);
    }

    deserialize<T>(): T {
        return (this.body() as unknown) as T;
    }
}
