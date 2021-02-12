import Platform from "../Platform/Platform";
import IChannel from "./IChannel";

export default class Channel implements IChannel {
    constructor(
        private _name: string,
        private _id: string,
        private _platformId: string,
        private _platform: Platform,
        private _subscriberCount: number
    ) {}

    name(): string {
        return this._name;
    }

    id(): string {
        return this._id;
    }

    platform(): Platform {
        return this._platform;
    }

    platformId(): string {
        return this._platformId;
    }

    subscriberCount(): number {
        return this._subscriberCount;
    }
}
