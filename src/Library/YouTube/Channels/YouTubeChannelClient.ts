import { youtube_v3 } from "googleapis";
import YouTubeAPIClient from "../YouTubeAPIClient";

export default class YouTubeChannelClient {
    constructor(private youTubeAPIClient: YouTubeAPIClient) {}

    searchChannelsByUsername(username: string): Promise<youtube_v3.Schema$SearchListResponse> {
        return new Promise((resolve, reject) => {
            this.youTubeAPIClient.service().search.list(
                {
                    auth: this.youTubeAPIClient.apiKey(),
                    part: ["snippet"],
                    q: username,
                    type: ["channel"],
                    maxResults: 50
                },
                function (err, response) {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(response.data);
                }
            );
        });
    }
}
