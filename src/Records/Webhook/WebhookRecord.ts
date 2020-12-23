import IDataStore from "../../DataStore/IDataStore";
import IWebhook from "../../Entities/Webhook/IWebhook";
import BasicRecord from "../BasicRecord";
import RecordMixin from "../RecordMixin";
import IWebhookRecord from "./IWebhookRecord";

class WebhookRecord extends BasicRecord<IWebhook> implements IWebhookRecord {
    constructor(dataStore : IDataStore<IWebhook>) {
        super(dataStore);
    }
}

export default RecordMixin<IWebhook>()(WebhookRecord);