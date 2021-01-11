import { youtube_v3 } from "googleapis";
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
                        return resolve(
                            videoResults.data.items.map((video) =>
                                this.createVideoFromYouTubeLibrarySchema(video)
                            )
                        );
                    }
                );
            }
        );
    }

    private createVideoFromYouTubeLibrarySchema(
        video: youtube_v3.Schema$Video
    ): IYouTubeVideoSchema {
        return {
            id: video.id,
            title: video.snippet.title,
            publishedAt: new Date(video.snippet.publishedAt),
            thumbnails: {
                default: video.snippet.thumbnails.default
                    ? {
                          url: video.snippet.thumbnails.default.url,
                          width: video.snippet.thumbnails.default.width,
                          height: video.snippet.thumbnails.default.height
                      }
                    : undefined,
                standard: video.snippet.thumbnails.standard
                    ? {
                          url: video.snippet.thumbnails.standard.url,
                          width: video.snippet.thumbnails.standard.width,
                          height: video.snippet.thumbnails.standard.height
                      }
                    : undefined,
                maxres: video.snippet.thumbnails.maxres
                    ? {
                          url: video.snippet.thumbnails.maxres.url,
                          width: video.snippet.thumbnails.maxres.width,
                          height: video.snippet.thumbnails.maxres.height
                      }
                    : undefined,
                medium: video.snippet.thumbnails.medium
                    ? {
                          url: video.snippet.thumbnails.medium.url,
                          width: video.snippet.thumbnails.medium.width,
                          height: video.snippet.thumbnails.medium.height
                      }
                    : undefined,
                high: video.snippet.thumbnails.high
                    ? {
                          url: video.snippet.thumbnails.high.url,
                          width: video.snippet.thumbnails.high.width,
                          height: video.snippet.thumbnails.high.height
                      }
                    : undefined
            }
        };
    }
}
