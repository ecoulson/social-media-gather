import Axios from "axios";
import ITweetSchema from "../../../Schema/ITweetSchema";
import TwitterAPIClient from "../../../TwitterAPIClient";
import ITwitterService from "../../ITwitterService";
import ITweetLookUpOptions from "./ITweetLookUpOptions";

export default class TweetServiceV2 implements ITwitterService {
    private static TweetsEndPoint = "https://api.twitter.com/2/tweets";

    constructor(private twitterClient: TwitterAPIClient) {}

    async lookup(options: ITweetLookUpOptions): Promise<ITweetSchema[]> {
        const url = `${TweetServiceV2.TweetsEndPoint}?ids=${options.ids.join(
            ","
        )}&fields=${options.fields.join(",")}&expansions=${options.expansions.join(",")}`;
        const response = await Axios.get(url, {
            headers: {
                authorization: `Bearer ${this.twitterClient.getAccessToken()}`
            }
        });
        console.log(response.data);
        return [];
    }
}
