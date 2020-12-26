import UserRecord from "../../Records/User/UserRecord";
import IUser from "../User/IUser";
import IYouTubeVideo from "./IYouTubeVideo";

export default class YouTubeVideo implements IYouTubeVideo {
    constructor(
        private id_: string,
        private userId_: string,
        private publishedAt_: Date,
        private thumbnailUrl_: string,
        private title_: string,
        private videoId_: string,
        private userRecord: InstanceType<typeof UserRecord>
    ) {}

    id(): string {
        return this.id_;
    }

    userId(): string {
        return this.userId_;
    }

    user(): Promise<IUser> {
        return this.userRecord.findById(this.id_);
    }

    publishedAt(): Date {
        return this.publishedAt_;
    }

    thumbnailUrl(): string {
        return this.thumbnailUrl_;
    }

    title(): string {
        return this.title_;
    }

    videoId(): string {
        return this.videoId_;
    }
}
