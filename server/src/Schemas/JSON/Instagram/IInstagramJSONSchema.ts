import IInstagramMediaJSONSchema from "./IInstagramMediaJSONSchema";

export default interface IInstagramJSONSchema {
    takenAt: Date;
    id: string;
    likes: number;
    caption: string;
    media: IInstagramMediaJSONSchema[];
    thumbnail: IInstagramMediaJSONSchema;
}
