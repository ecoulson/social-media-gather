import axios from "axios";
import ITwitchPaginatedResult from "../ITwitchPaginatedResult";
import ITwitchFollowResultSchema from "../Schemas/ITwitchFollowResultSchema";
import TwitchAPIClient from "../TwitchAPIClient";
import TwitchForwardPaginatedResult from "../TwitchForwardPaginatedResult";
import IGetFollowOptions from "./IGetFollowOptions";

export default class TwitchFollowClient {
    constructor(private apiClient: TwitchAPIClient) {}

    async get(
        options: IGetFollowOptions
    ): Promise<ITwitchPaginatedResult<ITwitchFollowResultSchema>> {
        const token = await this.apiClient.token.getAppAccessToken();
        const endpointURL = "https://api.twitch.tv/helix/users/follows";
        const response = await axios.get(`${endpointURL}?to_id=${options.to_id}`, {
            headers: {
                Authorization: `Bearer ${token.accessToken}`,
                "Client-Id": await this.apiClient.clientId()
            }
        });
        return new TwitchForwardPaginatedResult(
            this.apiClient,
            new URL(endpointURL),
            parseInt(response.headers["ratelimit-remaining"]),
            new Date(parseInt(response.headers["ratelimit-reset"]) * 1000),
            response.data.pagination,
            {
                total: response.data.total,
                follows: response.data.data
            }
        );
    }
}
