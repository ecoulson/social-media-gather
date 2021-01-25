import Builder from "../../Libraries/Builder/Builder";
import Image from "../Media/Image";
import ITwitchStream from "./ITwitchStream";
import TwitchStream from "./TwitchStream";

export default class TwitchStreamBuilder extends Builder<ITwitchStream> {
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

    reset() {
        this.viewers = null;
        this.isLive = null;
        this.thumbnail = null;
        this.startedAt = null;
        this.url = null;
        this.title = null;
        this.userId = null;
        this.screenName = null;
        this.gameName = null;
        this.streamId = null;
        this.id = null;
    }

    construct(): ITwitchStream {
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

    setChannelId(userId: string): TwitchStreamBuilder {
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
