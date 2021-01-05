import IUser from "./IUser";

export default class User implements IUser {
    constructor(
        private _id: string,
        private _twitterId: string,
        private _youTubeId: string,
        private _twitchId: string,
        private _instagramId: string,
        private _email: string,
        private _username: string,
        private _password: string,
        private _verified: boolean,
        private _followingIds: string[]
    ) {}

    id(): string {
        return this._id;
    }

    twitterId(): string {
        return this._twitterId;
    }

    youTubeId(): string {
        return this._youTubeId;
    }

    twitchId(): string {
        return this._twitchId;
    }

    instagramId(): string {
        return this._instagramId;
    }

    setInstagramId(instagramId: string): void {
        this._instagramId = instagramId;
    }

    email(): string {
        return this._email;
    }

    setEmail(newEmail: string): void {
        this._email = newEmail;
    }

    username(): string {
        return this._username;
    }

    verified(): boolean {
        return this._verified;
    }

    following(): string[] {
        return this._followingIds;
    }

    verify(): void {
        this._verified = true;
    }

    password(): string {
        return this._password;
    }

    addFollower(user: IUser): void {
        this._followingIds.push(user.id());
    }

    removeFollower(user: IUser): void {
        this._followingIds = this._followingIds.filter((id) => user.id() !== id);
    }
}
