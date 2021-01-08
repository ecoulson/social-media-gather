import IYouTubePaginatedResult from "../IYouTubePaginatedResult";
import IYouTubePlaylistSchema from "../Schema/IYouTubePlaylistSchema";
import IYouTubeResponseSchema from "../Schema/IYouTubeResponseSchema";
import YouTubeAPIClient from "../YouTubeAPIClient";
import YouTubePaginatedResult from "../YouTubePaginatedResult";
import IListPlaylistOptions from "./IListPlaylistOptions";

export default class PlaylistClient {
    constructor(private youTubeAPIClient: YouTubeAPIClient) {}

    list(
        options: IListPlaylistOptions
    ): Promise<IYouTubePaginatedResult<IYouTubePlaylistSchema[]>> {
        return new Promise((resolve, reject) => {
            this.youTubeAPIClient.service().playlistItems.list(
                {
                    part: options.part,
                    pageToken: options.pageToken,
                    auth: this.youTubeAPIClient.apiKey(),
                    playlistId: options.playlistId,
                    maxResults: options.maxResults
                },
                (err, playlistResponse) => {
                    if (err) {
                        return reject(err);
                    }
                    const paginatedResult = new YouTubePaginatedResult<IYouTubePlaylistSchema[]>(
                        this.list.bind(this),
                        options,
                        playlistResponse.data as IYouTubeResponseSchema<IYouTubePlaylistSchema[]>
                    );
                    return resolve(paginatedResult);
                }
            );
        });
    }
}
