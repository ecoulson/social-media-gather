import IInstagramMediaDocument from "./IInstagramMediaDocument";

export default interface IInstagramPostDocument {
    takenAt: Date;
    id: string;
    likes: string;
    commentCount: number;
    caption: string;
    media: IInstagramMediaDocument[];
    thumbnail: IInstagramMediaDocument;
}
