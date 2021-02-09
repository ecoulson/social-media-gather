import TwitterAPIClient from "../../TwitterAPIClient";
import TwitterAPIVersion from "../../TwitterAPIVersion";
import TwitterV1ServicesFactory from "./TwitterV1ServicesFactory";
import TwitterClientV2Factory from "./TwitterV2ServicesFactory";

export default class TwitterServiceAbstractFactory {
    constructor(private apiClient: TwitterAPIClient) {}

    createClientFactory(version: TwitterAPIVersion) {
        switch (version) {
            case TwitterAPIVersion.V1:
                return new TwitterV1ServicesFactory(this.apiClient);
            case TwitterAPIVersion.V2:
                return new TwitterClientV2Factory(this.apiClient);
            default:
                throw new Error("Unrecognized twitter api version");
        }
    }
}
