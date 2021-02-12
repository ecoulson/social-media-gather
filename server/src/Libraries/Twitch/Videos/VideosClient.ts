import Axios from "axios";
import { URL } from "url";
import ITwitchPaginatedResult from "../ITwitchPaginatedResult";
import ITwitchVideoSchema from "../Schemas/ITwitchVideoSchema";
import TwitchAPIClient from "../TwitchAPIClient";
import TwitchPaginatedResult from "../TwitchPaginatedResult";
import IGetVideoOptions from "./IGetVideoOptions";

export default class VideosClient {
    constructor(private twitchAPIClient: TwitchAPIClient) {}

    async get(options: IGetVideoOptions): Promise<ITwitchPaginatedResult<ITwitchVideoSchema[]>> {
        try {
            const token = await this.twitchAPIClient.token.getAppAccessToken();
            const url = `https://api.twitch.tv/helix/videos?user_id=${options.user_id.join(",")}`;
            const response = await Axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token.accessToken}`,
                    "Client-Id": await this.twitchAPIClient.clientId()
                }
            });
            return new TwitchPaginatedResult(
                this.twitchAPIClient,
                new URL(url),
                parseInt(response.headers["ratelimit-remaining"]),
                new Date(parseInt(response.headers["ratelimit-reset"]) * 1000),
                response.data.pagination,
                response.data.data
            );
        } catch (error) {
            console.log(error);
        }
    }
}
