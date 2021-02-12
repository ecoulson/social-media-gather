import Builder from "../../Libraries/Builder/Builder";
import Creator from "./Creator";
import ICreator from "./ICreator";

export default class CreatorBuilder extends Builder<ICreator> {
    private _id: string;
    private _email: string;
    private _username: string;
    private _password: string;
    private _verified: boolean;
    private _followers: string[];
    private _channels: string[];

    reset() {
        this._id = null;
        this._email = null;
        this._username = null;
        this._password = null;
        this._verified = false;
        this._followers = [];
        this._channels = [];
    }

    construct(): ICreator {
        return new Creator(
            this._id,
            this._email,
            this._username,
            this._password,
            this._verified,
            this._followers,
            this._channels
        );
    }

    setId(id: string): CreatorBuilder {
        this._id = id;
        return this;
    }

    setEmail(email: string): CreatorBuilder {
        this._email = email;
        return this;
    }

    setUsername(username: string): CreatorBuilder {
        this._username = username;
        return this;
    }

    setPassword(password: string): CreatorBuilder {
        this._password = password;
        return this;
    }

    setVerified(verified: boolean): CreatorBuilder {
        this._verified = verified;
        return this;
    }

    setFollowers(followers: string[]): CreatorBuilder {
        this._followers = followers;
        return this;
    }

    setChannels(channels: string[]): CreatorBuilder {
        this._channels = channels;
        return this;
    }
}
