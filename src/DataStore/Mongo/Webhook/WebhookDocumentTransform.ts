import { UpdateQuery } from "mongoose";
import { Transformer } from "../../../@Types";
import IWebhook from "../../../Entities/Webhook/IWebhook";
import IWebhookDocument from "../Models/Webhook/IWebhookDocument";

const WebhookDocumentTransform: Transformer<IWebhook, UpdateQuery<IWebhookDocument>> = (
    webhook
) => {
    return {
        callbackURL: webhook.callbackUrl(),
        topicURL: webhook.topicUrl(),
        expirationDate: webhook.expirationDate(),
        dateCreated: webhook.dateCreated(),
        channelId: webhook.channelId(),
        platform: webhook.platform(),
        userId: webhook.userId()
    };
};

export default WebhookDocumentTransform;
