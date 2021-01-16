import IImage from "../Media/IImage";
import ITwitchVideoBuilder from "./ITwitchVideoBuilder";
import TwitchVideo from "./TwitchVideo";

export default class TwitchVideoBuilder implements ITwitchVideoBuilder {
    private _id: string;
    private _url: string;
    private _gameName: string;
    private _publishedAt: Date;
    private _title: string;
    private _description: string;
    private _thumbnail: IImage;
    private _screenName: string;
    private _userId: string;
    private _views: number;

    setId(id: string): TwitchVideoBuilder {
        this._id = id;
        return this;
    }

    setUrl(url: string): TwitchVideoBuilder {
        this._url = url;
        return this;
    }

    setGameName(gameName: string): TwitchVideoBuilder {
        this._gameName = gameName;
        return this;
    }

    setPublishedAt(publishedAt: Date): TwitchVideoBuilder {
        this._publishedAt = publishedAt;
        return this;
    }

    setTitle(title: string) {
        this._title = title;
        return this;
    }

    setDescription(description: string) {
        this._description = description;
        return this;
    }

    setThumbnail(thumbnail: IImage) {
        this._thumbnail = thumbnail;
        return this;
    }

    setScreenName(screenName: string) {
        this._screenName = screenName;
        return this;
    }

    setUserId(userId: string) {
        this._userId = userId;
        return this;
    }

    setViews(views: number) {
        this._views = views;
        return this;
    }

    build() {
        return new TwitchVideo(
            this._id,
            this._url,
            this._gameName,
            this._publishedAt,
            this._title,
            this._description,
            this._thumbnail,
            this._screenName,
            this._userId,
            this._views
        );
    }
}
