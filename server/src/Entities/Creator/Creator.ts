import ICreator from "./ICreator";
import User from "../User/User";

export default class Creator extends User implements ICreator {
    constructor(
        _id: string,
        _email: string,
        _username: string,
        _password: string,
        _verified: boolean,
        _followingIds: string[],
        private _channelIds: string[]
    ) {
        super(_id, _email, _username, _password, _verified, _followingIds, true);
    }

    channels(): string[] {
        return this._channelIds;
    }
    addChannel(channelId: string): void {
        this._channelIds.push(channelId);
    }
    removeChannel(channelId: string): void {
        this._channelIds.splice(this._channelIds.indexOf(channelId), 1);
    }
}
