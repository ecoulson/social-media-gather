import IMessage from "./IMessage";
import IMessageStructure from "./IMessageStructure";
import MessageType from "./MessageType";

export default class UserExistsMessage implements IMessage {
    private _username: string;
    private _email: string;

    constructor(username: string, email: string) {
        this._username = username;
        this._email = email;
    }

    create(): IMessageStructure {
        return {
            metadata: {
                type: MessageType.UserExistsMessage,
                success: false
            },
            data: {
                message: `A user with either the username '${this._username}' or the email '${this._email}' already exists`
            }
        };
    }
}
