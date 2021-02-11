import axios from "axios";
import ITweetSchema from "../../../Schema/ITweetSchema";
import TwitterAPIClient from "../../../TwitterAPIClient";
import TwitterPaginatedResult from "../../../TwitterPaginatedResult";
import ITwitterService from "../../ITwitterService";
import ISearchOptions from "./ISearchOptions";

export default class SearchServiceV2 implements ITwitterService {
    private static RecentEndPoint = "https://api.twitter.com/2/tweets/search/recent";

    constructor(private twitterClient: TwitterAPIClient) {}

    async searchRecentTweets(
        options: ISearchOptions
    ): Promise<TwitterPaginatedResult<ITweetSchema[]>> {
        try {
            const url = `${SearchServiceV2.RecentEndPoint}?query=conversation_id:${
                options.conversationId
            }&tweet.fields=${options.tweetFields.join(",")}&max_results=100${
                options.untilId ? `&until_id=${options.untilId}` : ""
            }`;
            const response = await axios.get(url, {
                headers: {
                    authorization: `Bearer ${await this.twitterClient.getAccessToken()}`
                }
            });
            const tweets = response.data.data.map(
                (tweet: any): ITweetSchema => {
                    return {
                        user: {
                            id_str: tweet.author_id
                        },
                        text: tweet.text,
                        id_str: tweet.id,
                        in_reply_to_user_id: tweet.in_reply_to_user_id,
                        created_at: tweet.created_at,
                        conversation_id: tweet.conversation_id,
                        favorite_count: tweet.public_metrics.like_count,
                        retweet_count: tweet.public_metrics.retweet_count,
                        reply_count: tweet.public_metrics.reply_count
                    };
                }
            );
            return new TwitterPaginatedResult(
                tweets,
                {
                    newest_id: response.data.meta.newest_id,
                    oldest_id: response.data.meta.oldest_id,
                    isAtEnd: false
                },
                options,
                this.searchRecentTweets
            );
        } catch (error) {
            return new TwitterPaginatedResult(
                [],
                { newest_id: undefined, oldest_id: undefined, isAtEnd: true },
                options,
                this.searchRecentTweets
            );
        }
    }
}
