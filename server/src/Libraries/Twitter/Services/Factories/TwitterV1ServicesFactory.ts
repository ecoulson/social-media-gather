import UserServiceV1 from "../v1/Users/UserServiceV1";
import SearchServiceV1 from "../v1/Search/SearchServiceV1";
import TwitterAPIClient from "../../TwitterAPIClient";
import ITwitterServiceFactory from "./ITwitterServiceFactory";
import TwitterServiceType from "../../TwitterServiceType";
import ITwitterService from "../ITwitterService";
import TweetServiceV1 from "../v1/Tweets/TweetServiceV1";

export default class TwitterV1ServicesFactory implements ITwitterServiceFactory {
    constructor(private apiClient: TwitterAPIClient) {}

    createService(clientType: TwitterServiceType): ITwitterService {
        switch (clientType) {
            case TwitterServiceType.Search:
                return new SearchServiceV1(this.apiClient);
            case TwitterServiceType.Tweets:
                return new TweetServiceV1(this.apiClient);
            case TwitterServiceType.Users:
                return new UserServiceV1(this.apiClient);
            default:
                throw new Error(`Unrecognized or unimplemented client ${clientType} for API V1`);
        }
    }
}
