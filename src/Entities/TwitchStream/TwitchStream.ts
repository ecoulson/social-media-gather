import ITwitchStream from "./ITwitchStream";
import UserRecord from "../../Records/User/UserRecord";
import IImage from "../Media/IImage";

export default class TwitchStream implements ITwitchStream {
    constructor(
        private viewers_ : number,
        private isLive_ : boolean,
        private thumbnail_ : IImage,
        private timeStarted_ : Date,
        private url_ : string,
        private title_ : string,
        private userId_ : string,
        private screenName_ : string,
        private id_ : string,
        private gameName_ : string,
        private streamId_ : string,
        private userRecord_ : InstanceType<typeof UserRecord>,
        private endedAt_? : Date
    ) {}

    viewers() {
        return this.viewers_;
    }

    updateViewers(viewers : number) {
        this.viewers_ = viewers;
    }

    isLive() {
        return this.isLive_;
    }

    thumbnail() {
        return this.thumbnail_;
    }

    startedAt() {
        return this.timeStarted_;
    }

    url() {
        return this.url_;
    }

    title() {
        return this.title_;
    }

    userId() {
        return this.userId_
    }

    screenName() {
        return this.screenName_;
    }

    user() {
        return this.userRecord_.findById(this.userId_);
    }

    id() {
        return this.id_;
    }

    gameName() {
        return this.gameName_;
    }

    streamId() {
        return this.streamId_;
    }

    endedAt() {
        return this.endedAt_;
    }

    endStream() {
        this.isLive_ = false;
        this.endedAt_ = new Date();
    }
}