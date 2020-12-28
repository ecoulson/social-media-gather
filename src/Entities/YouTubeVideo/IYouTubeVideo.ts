import IEntity from "../IEntity";

export default interface IYouTubeVideo extends IEntity {
    publishedAt(): Date;
    thumbnailUrl(): string;
    title(): string;
    videoId(): string;
    userId(): string;
}
