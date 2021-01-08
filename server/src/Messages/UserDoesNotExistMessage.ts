import IMessage from "./IMessage";
import IMessageStructure from "./IMessageStructure";
import MessageType from "./MessageType";

export default class UserDoesNotExistMessage implements IMessage {
    private _username: string;

    constructor(username: string) {
        this._username = username;
    }

    create(): IMessageStructure {
        return {
            metadata: {
                type: MessageType.UserDoesNotExistMessage,
                success: false
            },
            data: {
                message: `There is no user with the username '${this._username}'`
            }
        };
    }
}
