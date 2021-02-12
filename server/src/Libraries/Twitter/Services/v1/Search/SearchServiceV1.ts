import Axios from "axios";
import TwitterAPIClient from "../../../TwitterAPIClient";
import IUsersSearchOptions from "./ITwitterLookUpOptions";
import { ITwitterUserSchema } from "../../../Schema/ITwitterUserSchema";
import ITwitterService from "../../ITwitterService";

export default class SearchServiceV1 implements ITwitterService {
    private static readonly TwitterLookupEndpoint = "https://api.twitter.com/1.1/users/lookup.json";

    constructor(private client: TwitterAPIClient) {}

    async searchUsers(options: IUsersSearchOptions): Promise<ITwitterUserSchema[]> {
        const response = await Axios.get(
            `${SearchServiceV1.TwitterLookupEndpoint}?${this.getLookupQuery(options)}`,
            {
                headers: {
                    Authorization: `Bearer ${await this.client.getAccessToken()}`
                }
            }
        );
        return response.data as ITwitterUserSchema[];
    }

    private getLookupQuery(options: IUsersSearchOptions) {
        const queries = [];
        if (options.ids) {
            queries.push(`id=${options.ids.join(",")}`);
        }
        if (options.screenNames) {
            queries.push(`screen_name=${options.screenNames.join(",")}`);
        }
        return queries.join("&");
    }
}
