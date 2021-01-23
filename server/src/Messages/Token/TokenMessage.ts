import IToken from "../../Security/Tokens/IToken";
import ITokenBody from "../Bodies/ITokenBody";
import Message from "../Message";
import MessageType from "../MessageType";
import MetaData from "../MetaData";
import { v4 as uuid } from "uuid";

export default class TokenMessage<T> extends Message<ITokenBody> {
    constructor(token: IToken<T>) {
        super(new MetaData(uuid(), true, MessageType.TokenMessage), {
            token: token.sign()
        });
    }
}
