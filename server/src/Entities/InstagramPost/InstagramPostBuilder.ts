import Builder from "../../Libraries/Builder/Builder";
import IImage from "../Media/IImage";
import IMedia from "../Media/IMedia";
import IInstagramPost from "./IInstagramPost";
import InstagramPost from "./InstagramPost";

export default class InstagramPostBuilder extends Builder<IInstagramPost> {
    private _id: string;
    private _takenAt: Date;
    private _likes: number;
    private _commentCount: number;
    private _caption: string;
    private _userId: string;
    private _media: IMedia[];
    private _thumbnail: IImage;
    private _postId: string;

    reset() {
        this._id = null;
        this._takenAt = null;
        this._likes = null;
        this._commentCount = null;
        this._caption = null;
        this._userId = null;
        this._media = null;
        this._thumbnail = null;
        this._postId = null;
    }

    construct(): IInstagramPost {
        return new InstagramPost(
            this._id,
            this._userId,
            this._postId,
            this._likes,
            this._takenAt,
            this._caption,
            this._media,
            this._thumbnail,
            this._commentCount
        );
    }

    setId(id: string): InstagramPostBuilder {
        this._id = id;
        return this;
    }

    setTakenAt(takenAt: Date): InstagramPostBuilder {
        this._takenAt = takenAt;
        return this;
    }

    setLikes(likes: number): InstagramPostBuilder {
        this._likes = likes;
        return this;
    }

    setCommentCount(commentCount: number): InstagramPostBuilder {
        this._commentCount = commentCount;
        return this;
    }

    setCaption(caption: string): InstagramPostBuilder {
        this._caption = caption;
        return this;
    }

    setChannelId(userId: string): InstagramPostBuilder {
        this._userId = userId;
        return this;
    }

    setMedia(media: IMedia[]): InstagramPostBuilder {
        this._media = media;
        return this;
    }

    setThumbnail(thumbnail: IImage): InstagramPostBuilder {
        this._thumbnail = thumbnail;
        return this;
    }

    setPostId(postId: string): InstagramPostBuilder {
        this._postId = postId;
        return this;
    }
}
