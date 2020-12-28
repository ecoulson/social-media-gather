import ITwitchStream from "./ITwitchStream";
import IImage from "../Media/IImage";

export default class TwitchStream implements ITwitchStream {
    constructor(
        private viewers_: number,
        private isLive_: boolean,
        private thumbnail_: IImage,
        private timeStarted_: Date,
        private url_: string,
        private title_: string,
        private userId_: string,
        private screenName_: string,
        private id_: string,
        private gameName_: string,
        private streamId_: string,
        private endedAt_?: Date
    ) {}

    viewers(): number {
        return this.viewers_;
    }

    updateViewers(viewers: number): void {
        this.viewers_ = viewers;
    }

    isLive(): boolean {
        return this.isLive_;
    }

    thumbnail(): IImage {
        return this.thumbnail_;
    }

    startedAt(): Date {
        return this.timeStarted_;
    }

    url(): string {
        return this.url_;
    }

    title(): string {
        return this.title_;
    }

    userId(): string {
        return this.userId_;
    }

    screenName(): string {
        return this.screenName_;
    }

    id(): string {
        return this.id_;
    }

    gameName(): string {
        return this.gameName_;
    }

    streamId(): string {
        return this.streamId_;
    }

    endedAt(): Date {
        return this.endedAt_;
    }

    endStream(): void {
        this.isLive_ = false;
        this.endedAt_ = new Date();
    }
}
