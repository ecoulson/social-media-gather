import IWebhook from "../../../Entities/Webhook/IWebhook";
import IWebhookDocument from "../../../Schemas/Mongo/Webhook/IWebhookDocument";
import WebhookModel from "../../../Schemas/Mongo/Webhook/WebhookModel";
import MongoDataStore from "../MongoDataStore";
import WebhookEntityTransformer from "./WebhookEntityTransform";
import WebhookDocumentTransform from "./WebhookDocumentTransform";

export default class WebhookMongoDataStore extends MongoDataStore<IWebhookDocument, IWebhook> {
    constructor() {
        super(WebhookModel, WebhookEntityTransformer, WebhookDocumentTransform);
    }
}
