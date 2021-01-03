import IVideoThumbnails from "../Videos/IVideoThumbnails";

export default interface IYouTubeVideoSchema {
    id: string;
    publishedAt: Date;
    thumbnails: IVideoThumbnails;
    title: string;
}
