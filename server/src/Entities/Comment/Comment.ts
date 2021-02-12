import IImage from "../Media/IImage";
import IComment from "./IComment";

export default class Comment implements IComment {
    constructor(
        private _id: string,
        private _postId: string,
        private _inReplyToId: string,
        private _text: string,
        private _replyCount: number,
        private _likes: number,
        private _dislikes: number,
        private _dateCreated: Date,
        private _username: string,
        private _profilePicture: IImage
    ) {}

    id(): string {
        return this._id;
    }

    postId(): string {
        return this._postId;
    }

    inReplyToId(): string {
        return this._inReplyToId;
    }

    text(): string {
        return this._text;
    }

    replyCount(): number {
        return this._replyCount;
    }

    likes(): number {
        return this._likes;
    }

    dislikes(): number {
        return this._dislikes;
    }

    dateCreated(): Date {
        return this._dateCreated;
    }

    username(): string {
        return this._username;
    }

    profileImage(): IImage {
        return this._profilePicture;
    }
}
