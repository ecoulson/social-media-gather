import IImage from "../Media/IImage";
import Post from "../Post/Post";
import PostType from "../Post/PostType";
import ITwitchVideo from "./ITwitchVideo";

export default class TwitchVideo extends Post implements ITwitchVideo {
    constructor(
        _id: string,
        private _url: string,
        private _gameName: string,
        private _publishedAt: Date,
        private _title: string,
        private _description: string,
        private _thumbnail: IImage,
        private _screenName: string,
        _channelId: string,
        private _views: number
    ) {
        super(PostType.TWITCH_VIDEO, _id, _channelId);
    }

    url(): string {
        return this._url;
    }

    gameName(): string {
        return this._gameName;
    }

    publishedAt(): Date {
        return this._publishedAt;
    }

    title(): string {
        return this._title;
    }

    description(): string {
        return this._description;
    }

    thumbnail(): IImage {
        return this._thumbnail;
    }

    screenName(): string {
        return this._screenName;
    }

    views(): number {
        return this._views;
    }
}
