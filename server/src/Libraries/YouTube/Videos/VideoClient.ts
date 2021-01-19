import IYouTubeVideoSchema from "../Schema/IYouTubeVideoSchema";
import YouTubeAPIClient from "../YouTubeAPIClient";
import IVideoListOptions from "./IVideoListOptions";

export default class VideoClient {
    constructor(private youtubeClient: YouTubeAPIClient) {}

    list(options: IVideoListOptions): Promise<IYouTubeVideoSchema[]> {
        return new Promise(
            async (
                resolve: (videos: IYouTubeVideoSchema[]) => void,
                reject: (error: Error) => void
            ) => {
                this.youtubeClient.service.videos.list(
                    {
                        part: options.parts,
                        id: options.ids,
                        auth: await this.youtubeClient.apiKey()
                    },
                    (err, videoResults) => {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(videoResults.data.items);
                    }
                );
            }
        );
    }
}
