import TwitterTweetClient from "./Tweets/TwitterTweetClient";
import TwitterUsersClient from "./Users/TwitterUsersClient";

export default class TwitterAPIClient {
    private usersClient: TwitterUsersClient;
    private tweetClient: TwitterTweetClient;

    constructor(private bearerToken: string) {
        this.usersClient = new TwitterUsersClient(this);
        this.tweetClient = new TwitterTweetClient(this);
    }

    getAccessToken(): string {
        return this.bearerToken;
    }

    get users(): TwitterUsersClient {
        return this.usersClient;
    }

    get tweets(): TwitterTweetClient {
        return this.tweetClient;
    }
}
