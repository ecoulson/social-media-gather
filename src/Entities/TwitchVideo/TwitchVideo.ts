import UserRecord from "../../Records/User/UserRecord";
import IImage from "../Media/IImage";
import ITwitchVideo from "./ITwitchVideo";

export default class TwitchVideo implements ITwitchVideo {
    constructor(
        private id_ : string,
        private url_ : string,
        private gameName_ : string,
        private publishedAt_ : Date,
        private title_ : string,
        private description_ : string,
        private thumbnail_ : IImage,
        private screenName_ : string,
        private userId_ : string,
        private userRecord_ : InstanceType<typeof UserRecord>
    ) {}

    id() {
        return this.id_;
    }

    url() {
        return this.url_;
    }

    gameName() {
        return this.gameName_;
    }

    publishedAt() {
        return this.publishedAt_;
    }

    title() {
        return this.title_;
    }

    description() {
        return this.description_;
    }

    thumbnail() {
        return this.thumbnail_;
    }

    screenName() {
        return this.screenName_;
    }

    userId() {
        return this.userId_
    }

    user() {
        return this.userRecord_.findById(this.userId_);
    }
}