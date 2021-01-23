import IYouTubeChannelSchema from "../Schema/IYouTubeChannelSchema";
import IYouTubeSearchResultSchema from "../Schema/IYouTubeSearchResultSchema";
import YouTubeAPIClient from "../YouTubeAPIClient";
import IYouTubeGetChannelOptions from "./IYouTubeGetChannelOptions";

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

    get(options: IYouTubeGetChannelOptions): Promise<IYouTubeChannelSchema[]> {
        return new Promise(async (resolve, reject) => {
            this.youTubeAPIClient.service.channels.list(
                {
                    auth: await this.youTubeAPIClient.apiKey(),
                    part: ["snippet", "contentDetails", "statistics"],
                    id: options.ids
                },
                (err, response) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(response.data.items as IYouTubeChannelSchema[]);
                }
            );
        });
    }
}
