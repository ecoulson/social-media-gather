import IMessage from "./IMessage";
import IMessageStructure from "./IMessageStructure";
import MessageType from "./MessageType";

export default class AuthenticatedMessage implements IMessage {
    constructor(private _isAuthenticated: boolean) {}

    create(): IMessageStructure {
        return {
            metadata: {
                success: true,
                type: MessageType.Authenticated
            },
            data: {
                isAuthenticated: this._isAuthenticated
            }
        };
    }
}
