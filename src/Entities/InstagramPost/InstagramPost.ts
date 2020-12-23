import UserRecord from "../../Records/User/UserRecord";
import IMedia from "../Media/IMedia";
import IInstagramPost from "./IInstagramPost";

export default class InstagramPost implements IInstagramPost {
    constructor(
        private id_ : string,
        private userId_ : string,
        private postId_ : string,
        private likes_ : number,
        private takenAt_ : Date,
        private caption_ : string,
        private media_ : IMedia[],
        private thumbnail_ : IMedia,
        private userRecord : InstanceType<typeof UserRecord>
    ) {}

    id() {
        return this.id_;
    }

    userId() {
        return this.userId_
    }

    user() {
        return this.userRecord.findById(this.userId_)
    }

    postId() {
        return this.postId_;
    }

    likes() {
        return this.likes_;
    }

    takenAt() {
        return this.takenAt_;
    }

    caption() {
        return this.caption_;
    }

    media() {
        return this.media_;
    }

    thumbnail() {
        return this.thumbnail_;
    }
}