import IWebhook from "./IWebhook";
import IWebhookBuilder from "./IWebhookBuilder";
import Webhook from "./Webhook";

export default class WebhookBuilder implements IWebhookBuilder {
    private _id: string;
    private _expirationDate: Date;
    private _dateCreated: Date;
    private _platform: string;
    private _topicUrl: string;
    private _callbackUrl: string;
    private _channelId: string;
    private _userId: string;

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

    setChannelId(channelId: string): WebhookBuilder {
        this._channelId = channelId;
        return this;
    }

    setUserId(userId: string): WebhookBuilder {
        this._userId = userId;
        return this;
    }

    build(): IWebhook {
        return new Webhook(
            this._id,
            this._expirationDate,
            this._dateCreated,
            this._platform,
            this._topicUrl,
            this._callbackUrl,
            this._channelId,
            this._userId
        );
    }
}
