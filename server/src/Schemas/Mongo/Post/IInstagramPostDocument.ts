import IInstagramMediaDocument from "./IInstagramMediaDocument";

export default interface IInstagramPostDocument {
    takenAt: Date;
    id: string;
    likes: string;
    commentCount: number;
    commentCursor: string;
    caption: string;
    media: IInstagramMediaDocument[];
    thumbnail: IInstagramMediaDocument;
}
