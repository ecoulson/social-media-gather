import UserRecord from "../../Records/User/UserRecord";
import IWebhook from "./IWebhook";

export default class Webhook implements IWebhook {
    constructor(
        private id_ : string,
        private expirationDate_ : Date,
        private dateCreated_ : Date,
        private platform_ : string,
        private topicUrl_ : string,
        private callbackUrl_ : string,
        private channelId_ : string,
        private userId_ : string,
        private userRecord : InstanceType<typeof UserRecord>
    ) {}

    id() {
        return this.id_;
    }

    expirationDate() {
        return this.expirationDate_;
    }

    dateCreated() {
        return this.dateCreated_;
    }

    platform() {
        return this.platform_;
    }

    topicUrl() {
        return this.topicUrl_;
    }

    callbackUrl() {
        return this.callbackUrl_;
    }

    channelId() {
        return this.channelId_;
    }

    user() {
        return this.userRecord.findById(this.userId_);
    }

    userId() {
        return this.userId_;
    }
}