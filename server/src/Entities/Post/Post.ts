import IPost from "./IPost";
import PostType from "./PostType";

export default abstract class Post implements IPost {
    constructor(private _type: PostType, private _id: string, private _channelId: string) {}

    type(): PostType {
        return this._type;
    }

    isType(type: PostType): boolean {
        return this._type === type;
    }

    id(): string {
        return this._id;
    }

    channelId(): string {
        return this._channelId;
    }
}
