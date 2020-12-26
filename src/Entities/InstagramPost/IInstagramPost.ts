import IEntity from "../IEntity";
import IMedia from "../Media/IMedia";
import IUser from "../User/IUser";

export default interface IInstagramPost extends IEntity {
    takenAt(): Date;
    likes(): number;
    caption(): string;
    user(): Promise<IUser>;
    userId(): string;
    media(): IMedia[];
    thumbnail(): IMedia;
    postId(): string;
}
