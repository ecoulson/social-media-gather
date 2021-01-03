import { inject, injectable, tagged } from "inversify";
import Tags from "../@Types/Tags";
import Types from "../@Types/Types";
import YouTubeVideoBuilder from "../Entities/YouTubeVideo/YouTubeVideoBuilder";
import IVideoThumbnails from "../Library/YouTube/Videos/IVideoThumbnails";
import YouTubeAPIClient from "../Library/YouTube/YouTubeAPIClient";
import YouTubeRepository from "../Repositories/YouTubeVideo/YouTubeRepository";
import IYouTubeWebhookCallbackData from "./IYouTubeWebhookCallbackData";
import WebhookCallbackService from "./WebhookCallbackService";

@injectable()
export default class YouTubeWebhookCallbackService extends WebhookCallbackService<IYouTubeWebhookCallbackData> {
    constructor(
        @inject(Types.YouTubeVideoRepository)
        @tagged(Tags.MONGO, true)
        private youTubeVideoRepository: InstanceType<typeof YouTubeRepository>,
        @inject(Types.YouTubeAPIClient)
        private youtubeAPIClient: YouTubeAPIClient
    ) {
        super();
    }

    async handleCallback({ userId, feed }: IYouTubeWebhookCallbackData): Promise<void> {
        if (await this.isNewVideo(feed.entry["yt:videoid"])) {
            const youTubeVideos = await this.youtubeAPIClient.videos.list({
                ids: [feed.entry["yt:videoid"]],
                parts: ["snippet", "contentDetails", "statistics", "player", "liveStreamingDetails"]
            });
            const newVideoData = youTubeVideos[0];
            const newVideo = new YouTubeVideoBuilder()
                .setPublishedAt(newVideoData.publishedAt)
                .setThumbnailUrl(this.getThumbnailUrl(newVideoData.thumbnails))
                .setTitle(newVideoData.title)
                .setUserId(userId)
                .setVideoId(newVideoData.id)
                .build();
            await this.youTubeVideoRepository.add(newVideo);
        }
    }

    private async isNewVideo(videoId: string) {
        const storedVideos = await this.youTubeVideoRepository.find({
            where: {
                "youtubeVideo.videoId": videoId
            }
        });
        return storedVideos.length === 0;
    }

    private getThumbnailUrl(thumbnails: IVideoThumbnails): string {
        if (thumbnails.standard) {
            return thumbnails.standard.url;
        }
        if (thumbnails.high) {
            return thumbnails.high.url;
        }
        if (thumbnails.maxres) {
            return thumbnails.maxres.url;
        }
        if (thumbnails.medium) {
            return thumbnails.medium.url;
        }
        return thumbnails.default.url;
    }
}
