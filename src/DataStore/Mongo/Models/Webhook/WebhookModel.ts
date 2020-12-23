import mongoose from "mongoose";
import IWebhookDocument from "./IWebhookDocument";

const { Schema } = mongoose;

const WebhookSchema = new Schema({
    expirationDate: Date,
    dateCreated: {
        default: Date.now(),
        type: Date
    },
    platform: String,
    topicURL: String,
    callbackURL: String,
    userId: String,
    channelId: String,
})

export default mongoose.model<IWebhookDocument>("Webhook", WebhookSchema);