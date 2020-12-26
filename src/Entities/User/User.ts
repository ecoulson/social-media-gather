import UserRecord from "../../Records/User/UserRecord";
import IUser from "./IUser";

export default class User implements IUser {
    constructor(
        private id_: string,
        private twitterId_: string,
        private youTubeId_: string,
        private twitchId_: string,
        private instagramId_: string,
        private email_: string,
        private username_: string,
        private verified_: boolean,
        private followingIds_: string[],
        private userRecord: InstanceType<typeof UserRecord>
    ) {}

    id(): string {
        return this.id_;
    }

    twitterId(): string {
        return this.twitterId_;
    }

    youTubeId(): string {
        return this.youTubeId_;
    }

    twitchId(): string {
        return this.twitchId_;
    }

    instagramId(): string {
        return this.instagramId_;
    }

    email(): string {
        return this.email_;
    }

    username(): string {
        return this.username_;
    }

    verified(): boolean {
        return this.verified_;
    }

    async following(): Promise<IUser[]> {
        return Promise.all(this.followingIds_.map((id) => this.userRecord.findById(id)));
    }

    followingIds(): string[] {
        return this.followingIds_;
    }
}
