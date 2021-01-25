import { inject, injectable, tagged } from "inversify";
import Tags from "../../@Types/Tags";
import Types from "../../@Types/Types";
import YouTubeVideoBuilder from "../../Entities/YouTubeVideo/YouTubeVideoBuilder";
import IYouTubeThumbnailSchema from "../../Libraries/YouTube/Schema/IYouTubeThumbnailSchema";
import YouTubeAPIClient from "../../Libraries/YouTube/YouTubeAPIClient";
import YouTubeRepository from "../../Repositories/YouTubeVideo/YouTubeRepository";
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

    async handleCallback({ channelId, feed }: IYouTubeWebhookCallbackData): Promise<void> {
        if (await this.isNewVideo(feed.entry["yt:videoid"])) {
            const youTubeVideos = await this.youtubeAPIClient.videos.list({
                ids: [feed.entry["yt:videoid"]],
                parts: ["snippet", "contentDetails", "statistics", "player", "liveStreamingDetails"]
            });
            const newVideoData = youTubeVideos[0];
            const newVideo = new YouTubeVideoBuilder()
                .setPublishedAt(new Date(newVideoData.snippet.publishedAt))
                .setThumbnailUrl(this.getThumbnailUrl(newVideoData.snippet.thumbnails))
                .setTitle(newVideoData.snippet.title)
                .setChannelId(channelId)
                .setVideoId(newVideoData.id)
                .setLikes(parseInt(newVideoData.statistics.likeCount))
                .setDislikes(parseInt(newVideoData.statistics.dislikeCount))
                .setCommentCount(parseInt(newVideoData.statistics.commentCount))
                .setViews(parseInt(newVideoData.statistics.viewCount))
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

    private getThumbnailUrl(thumbnails: IYouTubeThumbnailSchema): string {
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
