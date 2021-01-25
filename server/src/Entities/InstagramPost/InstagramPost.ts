import IImage from "../Media/IImage";
import IMedia from "../Media/IMedia";
import Post from "../Post/Post";
import PostType from "../Post/PostType";
import IInstagramPost from "./IInstagramPost";

export default class InstagramPost extends Post implements IInstagramPost {
    constructor(
        _id: string,
        _channelId: string,
        private _postId: string,
        private _likes: number,
        private _takenAt: Date,
        private _caption: string,
        private _media: IMedia[],
        private _thumbnail: IImage,
        private _commentCount: number
    ) {
        super(PostType.INSTAGRAM_POST, _id, _channelId);
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

    commentCount(): number {
        return this._commentCount;
    }
}
