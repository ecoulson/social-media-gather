import { Transformer } from "../../../@Types";
import IComment from "../../../Entities/Comment/IComment";
import ICommentDocument from "../../../Schemas/Mongo/Comment/ICommentDocument";

const CommentDocumentTransform: Transformer<IComment, Partial<ICommentDocument>> = (comment) => {
    return {
        dateCreated: comment.dateCreated(),
        dislikes: comment.dislikes(),
        inReplyToId: comment.inReplyToId(),
        likes: comment.likes(),
        postId: comment.postId(),
        profilePicture: comment.profileImage().url(),
        replyCount: comment.replyCount(),
        text: comment.text(),
        username: comment.username()
    };
};

export default CommentDocumentTransform;
