import { Transformer } from "../../../@Types";
import CommentBuilder from "../../../Entities/Comment/CommentBuilder";
import IComment from "../../../Entities/Comment/IComment";
import Image from "../../../Entities/Media/Image";
import ICommentDocument from "../../../Schemas/Mongo/Comment/ICommentDocument";

const CommentEntityTransform: Transformer<ICommentDocument, IComment> = (commentDocument) => {
    const commentBuilder = new CommentBuilder();
    return commentBuilder
        .setDateCreated(commentDocument.dateCreated)
        .setDislikes(commentDocument.dislikes)
        .setId(commentDocument.id)
        .setInReplyToId(commentDocument.inReplyToId)
        .setLikes(commentDocument.likes)
        .setPostId(commentDocument.postId)
        .setProfileImage(new Image(commentDocument.id, commentDocument.profilePicture, 0, 0))
        .setReplyCount(commentDocument.replyCount)
        .setText(commentDocument.text)
        .setUsername(commentDocument.username)
        .build();
};

export default CommentEntityTransform;
