import IWebhook from "../../../Entities/Webhook/IWebhook";
import IWebhookDocument from "../Models/Webhook/IWebhookDocument";
import WebhookModel from "../Models/Webhook/WebhookModel";
import MongoDataStore from "../MongoDataStore";
import WebhookEntityTransformer from "./WebhookEntityTransform";
import WebhookUpdateQueryTransform from "./WebhookUpdateQueryTransform";

export default class WebhookMongoDataStore extends MongoDataStore<IWebhookDocument, IWebhook> {
    constructor() {
        super(WebhookModel, WebhookEntityTransformer, WebhookUpdateQueryTransform);
    }
}