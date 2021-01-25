import IMedia from "../Media/IMedia";
import IPost from "../Post/IPost";

export default interface IInstagramPost extends IPost {
    takenAt(): Date;
    likes(): number;
    commentCount(): number;
    caption(): string;
    media(): IMedia[];
    thumbnail(): IMedia;
    postId(): string;
}
