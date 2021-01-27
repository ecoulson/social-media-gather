import { model, Schema } from "mongoose";
import ICommentDocument from "./ICommentDocument";

const commentSchema = new Schema({
    postId: {
        type: String,
        index: true
    },
    inReplyToId: {
        type: String,
        index: true
    },
    text: String,
    replyCount: Number,
    likes: Number,
    dislikes: Number,
    dateCreated: Date,
    username: String,
    profilePicture: String
});

export default model<ICommentDocument>("Comment", commentSchema);
