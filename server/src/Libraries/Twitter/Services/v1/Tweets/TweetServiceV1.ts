import axios from "axios";
import ITweetSchema from "../../../Schema/ITweetSchema";
import TwitterAPIClient from "../../../TwitterAPIClient";
import ITwitterService from "../../ITwitterService";
import ILookupTweetOptions from "./IGetTweetOptions";

export default class TweetServiceV1 implements ITwitterService {
    private static readonly LookupEndPoint = "https://api.twitter.com/1.1/statuses/lookup.json";

    constructor(private twitterAPIClient: TwitterAPIClient) {}

    async lookupTweets(options: ILookupTweetOptions): Promise<ITweetSchema[]> {
        const response = await axios.get(
            `${TweetServiceV1.LookupEndPoint}?id=${options.ids.join(
                ","
            )}&count=200&tweet_mode=extended&exclude_replies=true`,
            {
                headers: {
                    Authorization: `Bearer ${await this.twitterAPIClient.getAccessToken()}`
                }
            }
        );
        return response.data as ITweetSchema[];
    }
}
