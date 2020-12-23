import { Transformer } from "../../../@Types";
import IWebhook from "../../../Entities/Webhook/IWebhook";
import Webhook from "../../../Entities/Webhook/Webhook";
import UserRecord from "../../../Records/User/UserRecord";
import IWebhookDocument from "../Models/Webhook/IWebhookDocument";
import UserMongoDataStore from "../User/UserMongoDataStore";

const WebhookEntityTransformer : Transformer<IWebhookDocument, IWebhook> = (webhookDocument) => {
    return new Webhook(
        webhookDocument.id,
        webhookDocument.expirationDate,
        webhookDocument.dateCreated,
        webhookDocument.platform,
        webhookDocument.topicURL,
        webhookDocument.callbackURL,
        webhookDocument.channelId,
        webhookDocument.userId,
        new UserRecord(new UserMongoDataStore())
    );
}

export default WebhookEntityTransformer;