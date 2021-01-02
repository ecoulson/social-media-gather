import Post from "../Post/Post";
import PostType from "../Post/PostType";
import IYouTubeVideo from "./IYouTubeVideo";

export default class YouTubeVideo extends Post implements IYouTubeVideo {
    constructor(
        _id: string,
        private _userId: string,
        private _publishedAt: Date,
        private _thumbnailUrl: string,
        private _title: string,
        private _videoId: string
    ) {
        super(PostType.YOUTUBE_VIDEO, _id);
    }

    userId(): string {
        return this._userId;
    }

    publishedAt(): Date {
        return this._publishedAt;
    }

    thumbnailUrl(): string {
        return this._thumbnailUrl;
    }

    title(): string {
        return this._title;
    }

    videoId(): string {
        return this._videoId;
    }
}
