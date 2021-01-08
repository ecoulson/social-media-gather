import UserSerializer from "../Serializers/UserJSONSerializer";
import IUser from "../Entities/User/IUser";
import IMessage from "./IMessage";
import IMessageStructure from "./IMessageStructure";
import MessageType from "./MessageType";

export default class UsersMessage implements IMessage {
    constructor(private users: IUser[]) {}

    create(): IMessageStructure {
        return {
            metadata: {
                success: true,
                type: MessageType.UsersMessage
            },
            data: {
                users: this.users.map((user) => UserSerializer(user))
            }
        };
    }
}
