import IConfig from "../../Config/IConfig";
import TwitterTweetClient from "./Tweets/TwitterTweetClient";
import TwitterUsersClient from "./Users/TwitterUsersClient";

export default class TwitterAPIClient {
    private usersClient: TwitterUsersClient;
    private tweetClient: TwitterTweetClient;

    constructor(private config: IConfig) {
        this.usersClient = new TwitterUsersClient(this);
        this.tweetClient = new TwitterTweetClient(this);
    }

    getAccessToken(): Promise<string> {
        return this.config.getValue("TWITTER_BEARER_TOKEN");
    }

    get users(): TwitterUsersClient {
        return this.usersClient;
    }

    get tweets(): TwitterTweetClient {
        return this.tweetClient;
    }
}
