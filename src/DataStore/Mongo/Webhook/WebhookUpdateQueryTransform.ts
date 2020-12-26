import { UpdateQuery } from "mongoose";
import { Transformer } from "../../../@Types";
import IWebhook from "../../../Entities/Webhook/IWebhook";
import IWebhookDocument from "../Models/Webhook/IWebhookDocument";

const WebhookUpdateQueryTransform: Transformer<IWebhook, UpdateQuery<IWebhookDocument>> = (
    webhook
) => {
    return {
        _id: webhook.id(),
        callbackURL: webhook.callbackUrl(),
        topicURL: webhook.topicUrl(),
        expirationDate: webhook.expirationDate(),
        dateCreated: webhook.dateCreated(),
        channelId: webhook.channelId(),
        platform: webhook.platform(),
        userId: webhook.userId()
    };
};

export default WebhookUpdateQueryTransform;
