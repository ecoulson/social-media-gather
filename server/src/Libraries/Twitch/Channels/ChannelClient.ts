import Axios from "axios";
import { URL } from "url";
import ITwitchChannelSchema from "../Schemas/ITwitchChannelSchema";
import TwitchAPIClient from "../TwitchAPIClient";
import TwitchForwardPaginatedResult from "../TwitchForwardPaginatedResult";
import ISearchChannelOptions from "./ISearchChannelOptions";

export default class ChannelClient {
    constructor(private twitchApiClient: TwitchAPIClient) {}

    async search(
        options: ISearchChannelOptions
    ): Promise<TwitchForwardPaginatedResult<ITwitchChannelSchema[]>> {
        const token = await this.twitchApiClient.token.getAppAccessToken();
        const endpointURL = `https://api.twitch.tv/helix/search/channels?query=${options.query}`;
        const response = await Axios.get(endpointURL, {
            headers: {
                Authorization: `Bearer ${token.accessToken}`,
                "Client-Id": await this.twitchApiClient.clientId()
            }
        });
        return new TwitchForwardPaginatedResult(
            this.twitchApiClient,
            new URL(endpointURL),
            parseInt(response.headers["ratelimit-remaining"]),
            new Date(parseInt(response.headers["ratelimit-reset"]) * 1000),
            response.data.pagination,
            response.data.data as ITwitchChannelSchema[]
        );
    }
}
