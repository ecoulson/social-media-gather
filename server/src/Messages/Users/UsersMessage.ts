import IUser from "../../Entities/User/IUser";
import UserJSONSerializer from "../../Serializers/JSON/UserJSONSerializer";
import IUsersBody from "../Bodies/IUsersBody";
import Message from "../Message";
import MessageType from "../MessageType";
import MetaData from "../MetaData";
import { v4 as uuid } from "uuid";
import UserJSONDeserializer from "../../Serializers/JSON/UserJSONDeserializer";

export default class UsersMessage extends Message<IUsersBody> {
    constructor(users: IUser[]) {
        super(new MetaData(uuid(), true, MessageType.Users), {
            users: users.map((user) => UserJSONSerializer(user))
        });
    }

    deserialize<T>(): T {
        return (this.body().users.map((user) => UserJSONDeserializer(user)) as unknown) as T;
    }
}
