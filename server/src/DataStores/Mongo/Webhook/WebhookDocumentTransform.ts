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
        channelId: webhook.channelId(),
        platform: webhook.platform(),
        userId: webhook.userId()
    };
};

export default WebhookDocumentTransform;
