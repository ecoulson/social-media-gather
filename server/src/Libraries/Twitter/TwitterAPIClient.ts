import IConfig from "../../Config/IConfig";
import TwitterAPIVersion from "./TwitterAPIVersion";
import TwitterServiceAbstractFactory from "./Services/Factories/TwitterServiceAbstractFactory";
import ITwitterServiceFactory from "./Services/Factories/ITwitterServiceFactory";
import ITwitterService from "./Services/ITwitterService";
import TwitterServiceType from "./TwitterServiceType";

export default class TwitterAPIClient {
    private serviceFactory: ITwitterServiceFactory;

    constructor(private version: TwitterAPIVersion, private config: IConfig) {
        this.serviceFactory = new TwitterServiceAbstractFactory(this).createClientFactory(version);
    }

    getVersion(): TwitterAPIVersion {
        return this.version;
    }

    getAccessToken(): Promise<string> {
        return this.config.getValue("TWITTER_BEARER_TOKEN");
    }

    getService<T>(serviceType: TwitterServiceType): T {
        return this.serviceFactory.createService(serviceType) as T;
    }
}
