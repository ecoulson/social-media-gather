import IIsFollowingBody from "../Bodies/IIsFollowingBody";
import Message from "../Message";
import MessageType from "../MessageType";
import MetaData from "../MetaData";
import { v4 as uuid } from "uuid";

export default class IsFollowingMessage extends Message<IIsFollowingBody> {
    constructor(isFollowing: boolean) {
        super(new MetaData(uuid(), true, MessageType.IsFollowing), {
            isFollowing: isFollowing
        });
    }

    deserialize<T>(): T {
        return (this.body().isFollowing as unknown) as T;
    }
}
