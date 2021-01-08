import IYouTubeVideo from "./IYouTubeVideo";
import IYouTubeVideoBuilder from "./IYouTubeVideoBuilder";
import YouTubeVideo from "./YouTubeVideo";

export default class YouTubeVideoBuilder implements IYouTubeVideoBuilder {
    private publishedAt: Date;
    private thumbnailUrl: string;
    private title: string;
    private videoId: string;
    private userId: string;
    private id: string;

    constructor() {
        this.publishedAt = new Date();
        this.thumbnailUrl = "";
        this.title = "";
        this.videoId = "";
        this.userId = "";
        this.id = "";
    }

    setId(id: string): IYouTubeVideoBuilder {
        this.id = id;
        return this;
    }

    setPublishedAt(publishedAt: Date): IYouTubeVideoBuilder {
        this.publishedAt = publishedAt;
        return this;
    }

    setThumbnailUrl(url: string): IYouTubeVideoBuilder {
        this.thumbnailUrl = url;
        return this;
    }

    setTitle(title: string): IYouTubeVideoBuilder {
        this.title = title;
        return this;
    }

    setVideoId(videoId: string): IYouTubeVideoBuilder {
        this.videoId = videoId;
        return this;
    }

    setUserId(userId: string): IYouTubeVideoBuilder {
        this.userId = userId;
        return this;
    }

    build(): IYouTubeVideo {
        return new YouTubeVideo(
            this.id,
            this.userId,
            this.publishedAt,
            this.thumbnailUrl,
            this.title,
            this.videoId
        );
    }
}
