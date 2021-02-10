import axios from "axios";
import ITweetSchema from "../../../Schema/ITweetSchema";
import TwitterAPIClient from "../../../TwitterAPIClient";
import ITwitterService from "../../ITwitterService";
import ISearchOptions from "./ISearchOptions";

export default class SearchServiceV2 implements ITwitterService {
    private static RecentEndPoint = "https://api.twitter.com/2/tweets/search/recent";

    constructor(private twitterClient: TwitterAPIClient) {}

    async searchRecentTweets(options: ISearchOptions): Promise<ITweetSchema[]> {
        const url = `${SearchServiceV2.RecentEndPoint}?query=conversation_id:${
            options.conversationId
        }&tweet.fields=${options.tweetFields.join(",")}`;
        const response = await axios.get(url, {
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
                    in_reply_to_user_id: tweet.in_reply_to_user_id,
                    created_at: tweet.created_at,
                    conversation_id: tweet.conversation_id
                };
            }
        );
    }
}
