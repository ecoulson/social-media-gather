import Axios from "axios";
import ITweetSchema from "../../../Schema/ITweetSchema";
import TwitterAPIClient from "../../../TwitterAPIClient";
import ITwitterService from "../../ITwitterService";
import ITweetLookUpOptions from "./ITweetLookUpOptions";

export default class TweetServiceV2 implements ITwitterService {
    private static TweetsEndPoint = "https://api.twitter.com/2/tweets";

    constructor(private twitterClient: TwitterAPIClient) {}

    async lookup(options: ITweetLookUpOptions): Promise<ITweetSchema[]> {
        
        try {
            const url = `${TweetServiceV2.TweetsEndPoint}?ids=${options.ids.join(
                ","
            )}&tweet.fields=${options.tweetFields.join(",")}&expansions=${options.expansions.join(
                ","
            )}`;
            const response = await Axios.get(url, {
                headers: {
                    authorization: `Bearer ${await this.twitterClient.getAccessToken()}`
                }
            });
            return response.data.data.map(
                (tweet: any): ITweetSchema => {
                    return {
                        user: {
                            id_str: tweet.author_id
                        },
                        text: tweet.text,
                        id_str: tweet.id,
                        conversation_id: tweet.conversation_id,
                        created_at: tweet.created_at,
                        favorite_count: tweet.public_metrics.like_count,
                        retweet_count: tweet.public_metrics.retweet_count,
                        reply_count: tweet.public_metrics.reply_count
                    };
                }
            );
        } catch (error) {
            console.log(error);
        }
        
    }
}
