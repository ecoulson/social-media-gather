import IErrorBody from "../Bodies/IErrorBody";
import Message from "../Message";
import MessageType from "../MessageType";
import MetaData from "../MetaData";
import { v4 as uuid } from "uuid";

export default class ErrorMessage extends Message<IErrorBody> {
    constructor(error: Error) {
        super(new MetaData(uuid(), false, MessageType.Error), {
            error: {
                stack: error.stack,
                message: error.message,
                name: error.name
            }
        });
    }
}
