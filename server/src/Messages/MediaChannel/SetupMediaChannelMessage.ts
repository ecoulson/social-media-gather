import ICreateChannelBody from "../Bodies/ICreateChannelBody";
import Message from "../Message";
import MetaData from "../MetaData";
import { v4 as uuid } from "uuid";
import MessageType from "../MessageType";

export default class SetupMediaChannelMessage extends Message<ICreateChannelBody> {
    constructor(body: ICreateChannelBody) {
        super(new MetaData(uuid(), true, MessageType.SetupMediaChannel), body);
    }
}
