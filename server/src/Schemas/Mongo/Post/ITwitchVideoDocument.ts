export default interface ITwitchVideoDocument {
    url: string;
    gameName: string;
    publishedAt: Date;
    title: string;
    description: string;
    thumbnailUrl: string;
    userName: string;
    views: number;
}
