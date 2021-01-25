import { Document } from "mongoose";

export default interface IWebhookDocument extends Document {
    expirationDate: Date;
    dateCreated: Date;
    platform: string;
    topicURL: string;
    callbackURL: string;
    channelId: string;
    platformId: string;
}
