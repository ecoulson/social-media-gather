import Axios from "axios";
import ITweetSchema from "../Schema/ITweetSchema";
import TwitterAPIClient from "../TwitterAPIClient";
import ITwitterUsersLookUpOptions from "../Users/ITwitterLookUpOptions";

export default class TwitterTweetClient {
    private static TwitterTweetTimelineEndpoint =
        "https://api.twitter.com/1.1/statuses/user_timeline.json";

    constructor(private twitterClient: TwitterAPIClient) {}

    async lookup(options: ITwitterUsersLookUpOptions): Promise<ITweetSchema[]> {
        try {
            const response = await Axios.get(
                `${TwitterTweetClient.TwitterTweetTimelineEndpoint}?user_id=${options.ids.join(
                    ","
                )}&count=200&tweet_mode=extended&exclude_replies=true`,
                {
                    headers: {
                        Authorization: `Bearer ${await this.twitterClient.getAccessToken()}`
                    }
                }
            );
            return response.data as ITweetSchema[];
        } catch (error) {
            console.log(error);
        }
    }
}
