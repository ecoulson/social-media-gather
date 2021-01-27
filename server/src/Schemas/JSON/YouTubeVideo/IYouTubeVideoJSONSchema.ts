export default interface IYouTubeVideoJSONSchema {
    publishedAt: Date;
    thumbnailUrl: string;
    title: string;
    videoId: string;
    likes: number;
    dislikes: number;
    commentCount: number;
    views: number;
}
