import UserTransformer from "../Controllers/ResponseTransforms/UserTransformer";
import IUser from "../Entities/User/IUser";
import IMessage from "./IMessage";
import IMessageStructure from "./IMessageStructure";
import MessageType from "./MessageType";

export default class RetrievedUsersMessage implements IMessage {
    constructor(private users: IUser[]) {}

    create(): IMessageStructure {
        return {
            metadata: {
                success: true,
                type: MessageType.RetrievedUsersMessage
            },
            data: {
                users: this.users.map((user) => UserTransformer(user))
            }
        };
    }
}
