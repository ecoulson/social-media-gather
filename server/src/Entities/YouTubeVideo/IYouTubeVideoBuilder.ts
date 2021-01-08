import IYouTubeVideo from "./IYouTubeVideo";

export default interface IYouTubeVideoBuilder {
    setPublishedAt(publishedAt: Date): IYouTubeVideoBuilder;
    setThumbnailUrl(url: string): IYouTubeVideoBuilder;
    setTitle(title: string): IYouTubeVideoBuilder;
    setVideoId(videoId: string): IYouTubeVideoBuilder;
    setUserId(userId: string): IYouTubeVideoBuilder;
    setId(id: string): IYouTubeVideoBuilder;
    build(): IYouTubeVideo;
}
