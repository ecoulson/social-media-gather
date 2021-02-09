import TwitterServiceType from "../../TwitterServiceType";
import ITwitterService from "../ITwitterService";
import TweetServiceV2 from "../v2/Tweets/TweetServiceV2";
import TwitterAPIClient from "../../TwitterAPIClient";
import ITwitterServiceFactory from "./ITwitterServiceFactory";

export default class TwitterClientV2Factory implements ITwitterServiceFactory {
    constructor(private apiClient: TwitterAPIClient) {}

    createService(clientType: TwitterServiceType): ITwitterService {
        switch (clientType) {
            case TwitterServiceType.Tweets:
                return new TweetServiceV2(this.apiClient);
            case TwitterServiceType.Users:
            default:
                throw new Error(`Unrecognized or unimplemented client ${clientType} for api V2`);
        }
    }
}
