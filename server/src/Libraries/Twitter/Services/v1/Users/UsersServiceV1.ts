import Axios from "axios";
import TwitterAPIClient from "../../../TwitterAPIClient";
import ITwitterUsersLookUpOptions from "./ITwitterLookUpOptions";
import { ITwitterUserSchema } from "../../../Schema/ITwitterUserSchema";
import ITwitterService from "../../ITwitterService";

export default class UsersServiceV1 implements ITwitterService {
    private static readonly TwitterLookupEndpoint = "https://api.twitter.com/1.1/users/lookup.json";

    constructor(private client: TwitterAPIClient) {}

    async lookup(options: ITwitterUsersLookUpOptions): Promise<ITwitterUserSchema[]> {
        const response = await Axios.get(
            `${UsersServiceV1.TwitterLookupEndpoint}?${this.getLookupQuery(options)}`,
            {
                headers: {
                    Authorization: `Bearer ${await this.client.getAccessToken()}`
                }
            }
        );
        return response.data as ITwitterUserSchema[];
    }

    private getLookupQuery(options: ITwitterUsersLookUpOptions) {
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
