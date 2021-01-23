import IMessageBody from "../Bodies/IMessageBody";
import Message from "../Message";
import MessageType from "../MessageType";
import MetaData from "../MetaData";
import { v4 as uuid } from "uuid";

export default class UnauthenticatedMessage extends Message<IMessageBody> {
    constructor() {
        super(new MetaData(uuid(), false, MessageType.Unauthenticated), {
            message: `Unauthenticated`
        });
    }
}
