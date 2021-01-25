import IUser from "./IUser";

export default class User implements IUser {
    constructor(
        private _id: string,
        private _email: string,
        private _username: string,
        private _password: string,
        private _verified: boolean,
        private _followingIds: string[],
        private _isCreator: boolean,
        protected _channels: string[]
    ) {}

    channels() {
        return Array.from(this._channels);
    }

    id(): string {
        return this._id;
    }

    isCreator(): boolean {
        return this._isCreator;
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
        return Array.from(this._followingIds);
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
