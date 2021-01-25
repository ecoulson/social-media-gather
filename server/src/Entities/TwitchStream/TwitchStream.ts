import ITwitchStream from "./ITwitchStream";
import IImage from "../Media/IImage";
import Post from "../Post/Post";
import PostType from "../Post/PostType";

export default class TwitchStream extends Post implements ITwitchStream {
    constructor(
        private _viewers: number,
        private _isLive: boolean,
        private _thumbnail: IImage,
        private _timeStarted: Date,
        private _url: string,
        private _title: string,
        _userId: string,
        private _screenName: string,
        _id: string,
        private _gameName: string,
        private _streamId: string,
        _creatorId: string,
        private _endedAt?: Date
    ) {
        super(PostType.TWITCH_STREAM, _id, _userId, _creatorId);
    }

    viewers(): number {
        return this._viewers;
    }

    updateViewers(viewers: number): void {
        this._viewers = viewers;
    }

    isLive(): boolean {
        return this._isLive;
    }

    thumbnail(): IImage {
        return this._thumbnail;
    }

    startedAt(): Date {
        return this._timeStarted;
    }

    url(): string {
        return this._url;
    }

    title(): string {
        return this._title;
    }

    screenName(): string {
        return this._screenName;
    }

    gameName(): string {
        return this._gameName;
    }

    streamId(): string {
        return this._streamId;
    }

    endedAt(): Date {
        return this._endedAt;
    }

    endStream(): void {
        this._isLive = false;
        this._endedAt = new Date();
    }
}
