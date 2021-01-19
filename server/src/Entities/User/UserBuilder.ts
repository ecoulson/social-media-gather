import Builder from "../../Libraries/Builder/Builder";
import IUser from "./IUser";
import User from "./User";

export default class UserBuilder extends Builder<IUser> {
    private _id: string;
    private _twitterId: string;
    private _youTubeId: string;
    private _twitchId: string;
    private _instagramId: string;
    private _email: string;
    private _username: string;
    private _password: string;
    private _verified: boolean;
    private _followers: string[];

    reset() {
        this._id = null;
        this._twitchId = null;
        this._youTubeId = null;
        this._twitterId = null;
        this._instagramId = null;
        this._email = null;
        this._username = null;
        this._password = null;
        this._verified = false;
        this._followers = [];
    }

    construct(): IUser {
        return new User(
            this._id,
            this._twitterId,
            this._youTubeId,
            this._twitchId,
            this._instagramId,
            this._email,
            this._username,
            this._password,
            this._verified,
            this._followers
        );
    }

    setId(id: string): UserBuilder {
        this._id = id;
        return this;
    }

    setTwitterId(twitterId: string): UserBuilder {
        this._twitterId = twitterId;
        return this;
    }

    setYouTubeId(youTubeId: string): UserBuilder {
        this._youTubeId = youTubeId;
        return this;
    }

    setTwitchId(twitchId: string): UserBuilder {
        this._twitchId = twitchId;
        return this;
    }

    setInstagramId(instagramId: string): UserBuilder {
        this._instagramId = instagramId;
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
