import IEntity from "../IEntity";
import IMedia from "../Media/IMedia";

export default interface IInstagramPost extends IEntity {
    takenAt(): Date;
    likes(): number;
    caption(): string;
    userId(): string;
    media(): IMedia[];
    thumbnail(): IMedia;
    postId(): string;
}
