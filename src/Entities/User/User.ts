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
        private password_: string,
        private verified_: boolean,
        private followingIds_: string[]
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

    following(): string[] {
        return this.followingIds_;
    }

    verify(): void {
        this.verified_ = true;
    }

    password(): string {
        return this.password_;
    }

    addFollower(user: IUser): void {
        this.followingIds_.push(user.id());
    }
}
