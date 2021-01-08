import { Transformer } from "../../../@Types";
import IWebhook from "../../../Entities/Webhook/IWebhook";
import Webhook from "../../../Entities/Webhook/Webhook";
import IWebhookDocument from "../../../Schemas/Mongo/Webhook/IWebhookDocument";

const WebhookEntityTransformer: Transformer<IWebhookDocument, IWebhook> = (webhookDocument) => {
    return new Webhook(
        webhookDocument.id,
        webhookDocument.expirationDate,
        webhookDocument.dateCreated,
        webhookDocument.platform,
        webhookDocument.topicURL,
        webhookDocument.callbackURL,
        webhookDocument.channelId,
        webhookDocument.userId
    );
};

export default WebhookEntityTransformer;
