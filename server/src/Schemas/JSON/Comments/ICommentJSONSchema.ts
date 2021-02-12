import IImageJSONSchema from "../Media/IImageJSONSchema";

export default interface ICommentJSONSchema {
    id: string;
    postId: string;
    inReplyToId: string | null;
    text: string;
    replyCount: number;
    likes: number;
    dislikes: number;
    dateCreated: Date;
    username: string;
    profileImage: IImageJSONSchema;
}
