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
        _channels: string[]
    ) {
        super(_id, _email, _username, _password, _verified, _followingIds, true, _channels);
    }

    addChannel(channelId: string): void {
        this._channels.push(channelId);
    }
    removeChannel(channelId: string): void {
        this._channels.splice(this._channels.indexOf(channelId), 1);
    }
}
