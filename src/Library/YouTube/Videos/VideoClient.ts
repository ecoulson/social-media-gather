import { youtube_v3 } from "googleapis";
import IYouTubeVideoSchema from "../Schema/IYouTubeVideoSchema";
import YouTubeAPIClient from "../YouTubeAPIClient";
import IVideoListOptions from "./IVideoListOptions";

export default class VideoClient {
    constructor(private youtubeClient: YouTubeAPIClient) {}

    list(options: IVideoListOptions): Promise<IYouTubeVideoSchema[]> {
        return new Promise(
            (resolve: (videos: IYouTubeVideoSchema[]) => void, reject: (error: Error) => void) => {
                this.youtubeClient.service().videos.list(
                    {
                        part: options.parts,
                        id: options.ids,
                        auth: this.youtubeClient.apiKey()
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
                          url: video.snippet.thumbnails.default.url
                      }
                    : undefined,
                standard: video.snippet.thumbnails.standard
                    ? {
                          url: video.snippet.thumbnails.standard.url
                      }
                    : undefined,
                maxres: video.snippet.thumbnails.maxres
                    ? {
                          url: video.snippet.thumbnails.maxres.url
                      }
                    : undefined,
                medium: video.snippet.thumbnails.medium
                    ? {
                          url: video.snippet.thumbnails.medium.url
                      }
                    : undefined,
                high: video.snippet.thumbnails.high
                    ? {
                          url: video.snippet.thumbnails.high.url
                      }
                    : undefined
            }
        };
    }
}
