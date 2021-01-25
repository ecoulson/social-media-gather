import Builder from "../../Libraries/Builder/Builder";
import IYouTubeVideo from "./IYouTubeVideo";
import YouTubeVideo from "./YouTubeVideo";

export default class YouTubeVideoBuilder extends Builder<IYouTubeVideo> {
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

    reset() {
        this.publishedAt = null;
        this.thumbnailUrl = null;
        this.title = null;
        this.videoId = null;
        this.userId = null;
        this.id = null;
        this.likes = null;
        this.dislikes = null;
        this.views = null;
        this.commentCount = null;
    }

    construct(): IYouTubeVideo {
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

    setChannelId(userId: string): YouTubeVideoBuilder {
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
}
