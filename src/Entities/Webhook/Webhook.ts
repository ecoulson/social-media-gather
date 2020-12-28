import IWebhook from "./IWebhook";

export default class Webhook implements IWebhook {
    constructor(
        private id_: string,
        private expirationDate_: Date,
        private dateCreated_: Date,
        private platform_: string,
        private topicUrl_: string,
        private callbackUrl_: string,
        private channelId_: string,
        private userId_: string
    ) {}

    id(): string {
        return this.id_;
    }

    expirationDate(): Date {
        return this.expirationDate_;
    }

    dateCreated(): Date {
        return this.dateCreated_;
    }

    platform(): string {
        return this.platform_;
    }

    topicUrl(): string {
        return this.topicUrl_;
    }

    callbackUrl(): string {
        return this.callbackUrl_;
    }

    channelId(): string {
        return this.channelId_;
    }

    userId(): string {
        return this.userId_;
    }
}
