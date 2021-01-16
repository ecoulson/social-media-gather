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
    private likes: number;
    private dislikes: number;
    private views: number;
    private commentCount: number;

    constructor() {
        this.publishedAt = new Date();
        this.thumbnailUrl = "";
        this.title = "";
        this.videoId = "";
        this.userId = "";
        this.id = "";
        this.likes = 0;
        this.dislikes = 0;
        this.views = 0;
        this.commentCount = 0;
    }

    setId(id: string): YouTubeVideoBuilder {
        this.id = id;
        return this;
    }

    setPublishedAt(publishedAt: Date): YouTubeVideoBuilder {
        this.publishedAt = publishedAt;
        return this;
    }

    setThumbnailUrl(url: string): YouTubeVideoBuilder {
        this.thumbnailUrl = url;
        return this;
    }

    setTitle(title: string): YouTubeVideoBuilder {
        this.title = title;
        return this;
    }

    setVideoId(videoId: string): YouTubeVideoBuilder {
        this.videoId = videoId;
        return this;
    }

    setUserId(userId: string): YouTubeVideoBuilder {
        this.userId = userId;
        return this;
    }

    setLikes(likes: number): YouTubeVideoBuilder {
        this.likes = likes;
        return this;
    }

    setDislikes(dislikes: number): YouTubeVideoBuilder {
        this.dislikes = dislikes;
        return this;
    }

    setViews(views: number): YouTubeVideoBuilder {
        this.views = views;
        return this;
    }

    setCommentCount(commentCount: number): YouTubeVideoBuilder {
        this.commentCount = commentCount;
        return this;
    }

    build(): IYouTubeVideo {
        return new YouTubeVideo(
            this.id,
            this.userId,
            this.publishedAt,
            this.thumbnailUrl,
            this.title,
            this.videoId,
            this.likes,
            this.dislikes,
            this.views,
            this.commentCount
        );
    }
}
