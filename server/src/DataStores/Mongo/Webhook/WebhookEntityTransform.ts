import WebhookBuilder from "../../../Entities/Webhook/WebhookBuilder";
import { Transformer } from "../../../@Types";
import IWebhook from "../../../Entities/Webhook/IWebhook";
import Webhook from "../../../Entities/Webhook/Webhook";
import IWebhookDocument from "../../../Schemas/Mongo/Webhook/IWebhookDocument";

const WebhookEntityTransformer: Transformer<IWebhookDocument, IWebhook> = (webhookDocument) => {
    const webhookBuilder = new WebhookBuilder();
    webhookBuilder
        .setId(webhookDocument.id)
        .setExpirationDate(webhookDocument.expirationDate)
        .setDateCreated(webhookDocument.dateCreated)
        .setPlatform(webhookDocument.platform)
        .setTopicUrl(webhookDocument.topicURL)
        .setCallbackUrl(webhookDocument.callbackURL)
        .setChannelId(webhookDocument.channelId)
        .setUserId(webhookDocument.userId);
    return webhookBuilder.build();
};

export default WebhookEntityTransformer;
