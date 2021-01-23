import IAuthenticatedBody from "../Bodies/IAuthenticatedBody";
import Message from "../Message";
import MessageType from "../MessageType";
import MetaData from "../MetaData";
import { v4 as uuid } from "uuid";

export default class AuthenticatedMessage extends Message<IAuthenticatedBody> {
    constructor() {
        super(new MetaData(uuid(), true, MessageType.Authenticated), {
            isAuthenticated: true
        });
    }
}
