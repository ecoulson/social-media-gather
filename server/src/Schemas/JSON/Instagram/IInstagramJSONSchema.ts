import IInstagramMediaJSONSchema from "./IInstagramMediaJSONSchema";

export default interface IInstagramJSONSchema {
    takenAt: Date;
    id: string;
    likes: number;
    caption: string;
    commentCursor: string;
    commentCount: number;
    media: IInstagramMediaJSONSchema[];
    thumbnail: IInstagramMediaJSONSchema;
}
