import IUser from "./IUser";
import IUserBuilder from "./IUserBuilder";
import User from "./User";

export default class UserBuilder implements IUserBuilder {
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

    constructor() {
        this._id = "";
        this._twitchId = "";
        this._youTubeId = "";
        this._twitterId = "";
        this._instagramId = "";
        this._email = "";
        this._username = "";
        this._password = "";
        this._verified = false;
        this._followers = [];
    }

    setId(id: string): IUserBuilder {
        this._id = id;
        return this;
    }

    setTwitterId(twitterId: string): IUserBuilder {
        this._twitterId = twitterId;
        return this;
    }

    setYouTubeId(youTubeId: string): IUserBuilder {
        this._youTubeId = youTubeId;
        return this;
    }

    setTwitchId(twitchId: string): IUserBuilder {
        this._twitchId = twitchId;
        return this;
    }

    setInstagramId(instagramId: string): IUserBuilder {
        this._instagramId = instagramId;
        return this;
    }

    setEmail(email: string): IUserBuilder {
        this._email = email;
        return this;
    }

    setUsername(username: string): IUserBuilder {
        this._username = username;
        return this;
    }

    setPassword(password: string): IUserBuilder {
        this._password = password;
        return this;
    }

    setVerified(): IUserBuilder {
        this._verified = true;
        return this;
    }

    setFollowers(followers: string[]): IUserBuilder {
        this._followers = followers;
        return this;
    }

    build(): IUser {
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
}
