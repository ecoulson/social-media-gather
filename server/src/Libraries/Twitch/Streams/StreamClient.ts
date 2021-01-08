import Axios from "axios";
import ITwitchPaginatedResult from "../ITwitchPaginatedResult";
import ITwitchStreamSchema from "../Schemas/ITwitchStreamSchema";
import TwitchAPIClient from "../TwitchAPIClient";
import TwitchPaginatedResult from "../TwitchPaginatedResult";
import IGetStreamOptions from "./IGetStreamOptions";

export default class StreamClient {
    constructor(private client: TwitchAPIClient) {}

    async get(options: IGetStreamOptions): Promise<ITwitchPaginatedResult<ITwitchStreamSchema[]>> {
        const token = await this.client.token.getAppAccessToken();
        const endpointUrl = `https://api.twitch.tv/helix/streams?user_id=${options.user_id.join(
            ","
        )}`;
        const response = await Axios.get(endpointUrl, {
            headers: {
                Authorization: `Bearer ${token.accessToken}`,
                "Client-Id": this.client.clientId()
            }
        });
        return new TwitchPaginatedResult(
            this.client,
            new URL(endpointUrl),
            parseInt(response.headers["ratelimit-remaining"]),
            new Date(parseInt(response.headers["ratelimit-reset"]) * 1000),
            response.data.pagination,
            response.data.data
        );
    }
}
