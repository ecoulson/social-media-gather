import { youtube_v3 } from "googleapis";
import IYouTubeChannelSchema from "../Schema/IYouTubeChannelSchema";
import IYouTubeSearchResultSchema from "../Schema/IYouTubeSearchResultSchema";
import YouTubeAPIClient from "../YouTubeAPIClient";

export default class YouTubeChannelClient {
    constructor(private youTubeAPIClient: YouTubeAPIClient) {}

    searchChannels(query: string): Promise<IYouTubeSearchResultSchema[]> {
        return new Promise(async (resolve, reject) => {
            this.youTubeAPIClient.service.search.list(
                {
                    auth: await this.youTubeAPIClient.apiKey(),
                    part: ["snippet"],
                    q: query,
                    type: ["channel"],
                    maxResults: 50
                },
                function (err, response) {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(response.data.items as IYouTubeSearchResultSchema[]);
                }
            );
        });
    }

    get(channelId: string): Promise<IYouTubeChannelSchema> {
        return new Promise(async (resolve, reject) => {
            this.youTubeAPIClient.service.channels.list(
                {
                    auth: await this.youTubeAPIClient.apiKey(),
                    part: ["snippet", "contentDetails", "statistics"],
                    id: [channelId]
                },
                (err, response) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(response.data.items[0] as IYouTubeChannelSchema);
                }
            );
        });
    }
}
