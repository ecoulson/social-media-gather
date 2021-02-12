import Axios from "axios";
import ITweetSchema from "../../../Schema/ITweetSchema";
import TwitterAPIClient from "../../../TwitterAPIClient";
import IUsersTimelineOptions from "../Search/ITwitterLookUpOptions";

export default class UserServiceV1 {
    private static TwitterTweetTimelineEndpoint =
        "https://api.twitter.com/1.1/statuses/user_timeline.json";

    constructor(private twitterClient: TwitterAPIClient) {}

    async timeline(options: IUsersTimelineOptions): Promise<ITweetSchema[]> {
        try {
            console.log(
                `${UserServiceV1.TwitterTweetTimelineEndpoint}?user_id=${options.ids.join(
                    ","
                )}&count=200&tweet_mode=extended&exclude_replies=true`
            );
            const response = await Axios.get(
                `${UserServiceV1.TwitterTweetTimelineEndpoint}?user_id=${options.ids.join(
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
