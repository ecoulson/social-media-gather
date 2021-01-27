import { Transformer } from "../../@Types";
import IComment from "../../Entities/Comment/IComment";
import ICommentJSONSchema from "../../Schemas/JSON/Comments/ICommentJSONSchema";

const CommentJSONSerializer: Transformer<IComment, ICommentJSONSchema> = (schema) => {
    return {
        id: schema.id(),
        postId: schema.postId(),
        inReplyToId: schema.inReplyToId(),
        text: schema.text(),
        replyCount: schema.replyCount(),
        likes: schema.likes(),
        dislikes: schema.dislikes(),
        dateCreated: schema.dateCreated(),
        username: schema.username(),
        profileImage: {
            id: schema.profileImage().id(),
            url: schema.profileImage().url(),
            width: schema.profileImage().width(),
            height: schema.profileImage().height()
        }
    };
};

export default CommentJSONSerializer;
