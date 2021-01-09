import IImage from "../Media/IImage";
import IMedia from "../Media/IMedia";
import Post from "../Post/Post";
import PostType from "../Post/PostType";
import IInstagramPost from "./IInstagramPost";

export default class InstagramPost extends Post implements IInstagramPost {
    constructor(
        _id: string,
        private _userId: string,
        private _postId: string,
        private _likes: number,
        private _takenAt: Date,
        private _caption: string,
        private _media: IMedia[],
        private _thumbnail: IImage
    ) {
        super(PostType.INSTAGRAM_POST, _id);
    }

    userId(): string {
        return this._userId;
    }

    postId(): string {
        return this._postId;
    }

    likes(): number {
        return this._likes;
    }

    takenAt(): Date {
        return this._takenAt;
    }

    caption(): string {
        return this._caption;
    }

    media(): IMedia[] {
        return this._media;
    }

    thumbnail(): IImage {
        return this._thumbnail;
    }
}