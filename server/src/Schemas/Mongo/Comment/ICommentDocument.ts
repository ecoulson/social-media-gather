import { Document } from "mongoose";

export default interface ICommentDocument extends Document {
    postId: string;
    inReplyToId: string;
    text: string;
    replyCount: number;
    likes: number;
    dislikes: number;
    dateCreated: Date;
    username: string;
    profilePicture: string;
    commentCursor: string;
}
