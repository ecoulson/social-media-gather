import Image from "../Media/Image";
import ITwitchStream from "./ITwitchStream";
import ITwitchStreamBuilder from "./ITwitchStreamBuilder";
import TwitchStream from "./TwitchStream";

export default class TwitchStreamBuilder implements ITwitchStreamBuilder {
    private viewers: number;
    private isLive: boolean;
    private thumbnail: Image;
    private startedAt: Date;
    private endedAt?: Date;
    private url: string;
    private title: string;
    private userId: string;
    private screenName: string;
    private gameName: string;
    private streamId: string;
    private id: string;

    constructor() {
        this.viewers = 0;
        this.isLive = false;
        this.thumbnail = null;
        this.startedAt = new Date();
        this.url = "";
        this.title = "";
        this.userId = "";
        this.screenName = "";
        this.gameName = "";
        this.streamId = "";
        this.id = "";
    }

    build(): ITwitchStream {
        return new TwitchStream(
            this.viewers,
            this.isLive,
            this.thumbnail,
            this.startedAt,
            this.url,
            this.title,
            this.userId,
            this.screenName,
            this.id,
            this.gameName,
            this.streamId,
            this.endedAt
        );
    }

    setViewers(viewers: number): TwitchStreamBuilder {
        this.viewers = viewers;
        return this;
    }

    setStatus(isLive: boolean): TwitchStreamBuilder {
        this.isLive = isLive;
        return this;
    }

    setThumbnail(thumbnail: Image): TwitchStreamBuilder {
        this.thumbnail = thumbnail;
        return this;
    }

    setStartedAt(startedAt: Date): TwitchStreamBuilder {
        this.startedAt = startedAt;
        return this;
    }

    setEndedAt(endedAt: Date): TwitchStreamBuilder {
        this.endedAt = endedAt;
        return this;
    }

    setUrl(url: string): TwitchStreamBuilder {
        this.url = url;
        return this;
    }

    setTitle(title: string): TwitchStreamBuilder {
        this.title = title;
        return this;
    }

    setUserId(userId: string): TwitchStreamBuilder {
        this.userId = userId;
        return this;
    }

    setScreenName(screenName: string): TwitchStreamBuilder {
        this.screenName = screenName;
        return this;
    }

    setGameName(gameName: string): TwitchStreamBuilder {
        this.gameName = gameName;
        return this;
    }

    setStreamId(streamId: string): TwitchStreamBuilder {
        this.streamId = streamId;
        return this;
    }

    setId(id: string): TwitchStreamBuilder {
        this.id = id;
        return this;
    }
}
