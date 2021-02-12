import Builder from "../../Libraries/Builder/Builder";
import IWebhook from "./IWebhook";
import Webhook from "./Webhook";

export default class WebhookBuilder extends Builder<IWebhook> {
    private _id: string;
    private _expirationDate: Date;
    private _dateCreated: Date;
    private _platform: string;
    private _topicUrl: string;
    private _callbackUrl: string;
    private _platformId: string;
    private _channelId: string;

    reset(): void {
        this._id = null;
        this._expirationDate = null;
        this._dateCreated = null;
        this._platform = null;
        this._topicUrl = null;
        this._callbackUrl = null;
        this._platformId = null;
        this._channelId = null;
    }

    construct(): IWebhook {
        return new Webhook(
            this._id,
            this._expirationDate,
            this._dateCreated,
            this._platform,
            this._topicUrl,
            this._callbackUrl,
            this._platformId,
            this._channelId
        );
    }

    setId(id: string): WebhookBuilder {
        this._id = id;
        return this;
    }

    setExpirationDate(expirationDate: Date): WebhookBuilder {
        this._expirationDate = expirationDate;
        return this;
    }

    setDateCreated(dateCreated: Date): WebhookBuilder {
        this._dateCreated = dateCreated;
        return this;
    }

    setPlatform(platform: string): WebhookBuilder {
        this._platform = platform;
        return this;
    }

    setTopicUrl(topicUrl: string): WebhookBuilder {
        this._topicUrl = topicUrl;
        return this;
    }

    setCallbackUrl(callbackUrl: string): WebhookBuilder {
        this._callbackUrl = callbackUrl;
        return this;
    }

    setPlatformId(platformId: string): WebhookBuilder {
        this._platformId = platformId;
        return this;
    }

    setChannelId(channelId: string): WebhookBuilder {
        this._channelId = channelId;
        return this;
    }
}
