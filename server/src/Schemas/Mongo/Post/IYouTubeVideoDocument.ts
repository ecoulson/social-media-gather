export default interface IYouTubeVideoDocument {
    publishedAt: Date;
    thumbnailUrl: string;
    title: string;
    videoId: string;
    likes: number;
    dislikes: number;
    views: number;
    commentCount: number;
    commentPageToken: string;
}
