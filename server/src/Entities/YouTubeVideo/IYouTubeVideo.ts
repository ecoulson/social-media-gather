import IPost from "../Post/IPost";

export default interface IYouTubeVideo extends IPost {
    publishedAt(): Date;
    thumbnailUrl(): string;
    title(): string;
    videoId(): string;
    userId(): string;
    likes(): number;
    dislikes(): number;
    commentCount(): number;
    views(): number;
}
