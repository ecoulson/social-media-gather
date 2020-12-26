import UserRecord from "../../Records/User/UserRecord";
import IImage from "../Media/IImage";
import IUser from "../User/IUser";
import ITwitchVideo from "./ITwitchVideo";

export default class TwitchVideo implements ITwitchVideo {
    constructor(
        private id_: string,
        private url_: string,
        private gameName_: string,
        private publishedAt_: Date,
        private title_: string,
        private description_: string,
        private thumbnail_: IImage,
        private screenName_: string,
        private userId_: string,
        private userRecord_: InstanceType<typeof UserRecord>
    ) {}

    id(): string {
        return this.id_;
    }

    url(): string {
        return this.url_;
    }

    gameName(): string {
        return this.gameName_;
    }

    publishedAt(): Date {
        return this.publishedAt_;
    }

    title(): string {
        return this.title_;
    }

    description(): string {
        return this.description_;
    }

    thumbnail(): IImage {
        return this.thumbnail_;
    }

    screenName(): string {
        return this.screenName_;
    }

    userId(): string {
        return this.userId_;
    }

    user(): Promise<IUser> {
        return this.userRecord_.findById(this.userId_);
    }
}
