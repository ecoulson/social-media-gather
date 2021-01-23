import IUser from "../../Entities/User/IUser";
import UserSerializer from "../../Serializers/UserJSONSerializer";
import IUsersBody from "../Bodies/IUsersBody";
import Message from "../Message";
import MessageType from "../MessageType";
import MetaData from "../MetaData";
import { v4 as uuid } from "uuid";

export default class UsersMessage extends Message<IUsersBody> {
    constructor(users: IUser[]) {
        super(new MetaData(uuid(), true, MessageType.UsersMessage), {
            users: users.map((user) => UserSerializer(user))
        });
    }
}
