import { Transformer } from "../../../@Types";
import IWebhook from "../../../Entities/Webhook/IWebhook";
import IWebhookDocument from "../../../Schemas/Mongo/Webhook/IWebhookDocument";

const WebhookDocumentTransform: Transformer<IWebhook, Partial<IWebhookDocument>> = (
    webhook
) => {
    return {
        callbackURL: webhook.callbackUrl(),
        topicURL: webhook.topicUrl(),
        expirationDate: webhook.expirationDate(),
        dateCreated: webhook.dateCreated(),
        platformId: webhook.platformChannelId(),
        platform: webhook.platform(),
        channelId: webhook.channelId()
    };
};

export default WebhookDocumentTransform;
