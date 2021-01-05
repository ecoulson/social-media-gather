import IWebhook from "./IWebhook";

export default class Webhook implements IWebhook {
    constructor(
        private _id: string,
        private _expirationDate: Date,
        private _dateCreated: Date,
        private _platform: string,
        private _topicUrl: string,
        private _callbackUrl: string,
        private _channelId: string,
        private _userId: string
    ) {}

    id(): string {
        return this._id;
    }

    expirationDate(): Date {
        return this._expirationDate;
    }

    dateCreated(): Date {
        return this._dateCreated;
    }

    platform(): string {
        return this._platform;
    }

    topicUrl(): string {
        return this._topicUrl;
    }

    callbackUrl(): string {
        return this._callbackUrl;
    }

    channelId(): string {
        return this._channelId;
    }

    userId(): string {
        return this._userId;
    }
}
