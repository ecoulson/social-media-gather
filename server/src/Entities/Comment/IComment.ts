import IImage from "../Media/IImage";

export default interface IComment {
    id(): string;
    postId(): string;
    inReplyToId(): string | null;
    text(): string;
    replyCount(): number;
    likes(): number;
    dislikes(): number;
    dateCreated(): Date;
    username(): string;
    profileImage(): IImage;
}
