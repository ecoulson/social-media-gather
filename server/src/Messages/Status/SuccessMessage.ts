import Message from "../Message";
import MessageType from "../MessageType";
import MetaData from "../MetaData";
import { v4 as uuid } from "uuid";

export default class SuccessMessage extends Message<unknown> {
    constructor() {
        super(new MetaData(uuid(), true, MessageType.Success), {});
    }
}
