import IToken from "../Security/Tokens/IToken";
import IMessage from "./IMessage";
import IMessageStructure from "./IMessageStructure";
import MessageType from "./MessageType";

export default class TokenMessage<T> implements IMessage {
    constructor(private _token: IToken<T>) {}

    create(): IMessageStructure {
        return {
            metadata: {
                success: true,
                type: MessageType.TokenMessage
            },
            data: {
                token: this._token.sign()
            }
        };
    }
}
