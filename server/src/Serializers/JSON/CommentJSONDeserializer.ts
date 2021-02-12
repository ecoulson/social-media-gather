import { Transformer } from "../../@Types";
import CommentBuilder from "../../Entities/Comment/CommentBuilder";
import IComment from "../../Entities/Comment/IComment";
import Image from "../../Entities/Media/Image";
import ICommentJSONSchema from "../../Schemas/JSON/Comments/ICommentJSONSchema";

const CommentJSONDeserializer: Transformer<ICommentJSONSchema, IComment> = (schema) => {
    const commentBuilder = new CommentBuilder();
    commentBuilder
        .setDateCreated(schema.dateCreated)
        .setDislikes(schema.dislikes)
        .setId(schema.id)
        .setInReplyToId(schema.inReplyToId)
        .setLikes(schema.likes)
        .setPostId(schema.postId)
        .setProfileImage(
            new Image(
                schema.profileImage.id,
                schema.profileImage.url,
                schema.profileImage.width,
                schema.profileImage.height
            )
        )
        .setReplyCount(schema.replyCount)
        .setText(schema.text)
        .setUsername(schema.username);

    return commentBuilder.build();
};

export default CommentJSONDeserializer;
