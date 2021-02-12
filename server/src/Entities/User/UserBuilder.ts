import Builder from "../../Libraries/Builder/Builder";
import IUser from "./IUser";
import User from "./User";

export default class UserBuilder extends Builder<IUser> {
    private _id: string;
    private _email: string;
    private _username: string;
    private _password: string;
    private _verified: boolean;
    private _followers: string[];
    private _isCreator: boolean;
    private _channels: string[];

    reset() {
        this._id = null;
        this._email = null;
        this._username = null;
        this._password = null;
        this._verified = false;
        this._followers = [];
        this._isCreator = false;
        this._channels = [];
    }

    construct(): IUser {
        return new User(
            this._id,
            this._email,
            this._username,
            this._password,
            this._verified,
            this._followers,
            this._isCreator,
            this._channels
        );
    }

    setChannels(channels: string[]): UserBuilder {
        this._channels = channels;
        return this;
    }

    setCreator(isCreator: boolean): UserBuilder {
        this._isCreator = isCreator;
        return this;
    }

    setId(id: string): UserBuilder {
        this._id = id;
        return this;
    }

    setEmail(email: string): UserBuilder {
        this._email = email;
        return this;
    }

    setUsername(username: string): UserBuilder {
        this._username = username;
        return this;
    }

    setPassword(password: string): UserBuilder {
        this._password = password;
        return this;
    }

    setVerified(verified: boolean): UserBuilder {
        this._verified = verified;
        return this;
    }

    setFollowers(followers: string[]): UserBuilder {
        this._followers = followers;
        return this;
    }
}
