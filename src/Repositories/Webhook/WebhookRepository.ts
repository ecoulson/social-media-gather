import IDataStore from "../../DataStore/IDataStore";
import IWebhook from "../../Entities/Webhook/IWebhook";
import CoreRepository from "../CoreRepository";
import RepositoryMixin from "../RepositoryMixin";

class WebhookRepository extends CoreRepository<IWebhook> {
    constructor(dataStore: IDataStore<IWebhook>) {
        super(dataStore);
    }
}

export default RepositoryMixin<IWebhook>()(WebhookRepository);
