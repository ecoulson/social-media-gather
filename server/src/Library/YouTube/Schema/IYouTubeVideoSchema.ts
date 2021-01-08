import IYouTubeThumbnailSchema from "./IYouTubeThumbnailSchema";

export default interface IYouTubeVideoSchema {
    id: string;
    publishedAt: Date;
    thumbnails: IYouTubeThumbnailSchema;
    title: string;
}
