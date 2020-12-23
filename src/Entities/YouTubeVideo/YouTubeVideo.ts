import UserRecord from "../../Records/User/UserRecord";
import IYouTubeVideo from "./IYouTubeVideo";

export default class YouTubeVideo implements IYouTubeVideo {
    constructor(
        private id_ : string,
        private userId_ : string,
        private publishedAt_: Date,
        private thumbnailUrl_: string,
        private title_ : string,
        private videoId_ : string,
        private userRecord : InstanceType<typeof UserRecord>
    ) {}

    id() {
        return this.id_;
    }

    userId() {
        return this.userId_;
    }

    user() {
        return this.userRecord.findById(this.id_);
    }

    publishedAt() {
        return this.publishedAt_;
    }

    thumbnailUrl() {
        return this.thumbnailUrl_;
    }

    title() {
        return this.title_;
    }

    videoId() {
        return this.videoId_;
    }
}