import InstagramPostBuilder from "../../../Entities/InstagramPost/InstagramPostBuilder";
import { Transformer } from "../../../@Types";
import IInstagramPost from "../../../Entities/InstagramPost/IInstagramPost";
import Image from "../../../Entities/Media/Image";
import IMedia from "../../../Entities/Media/IMedia";
import Video from "../../../Entities/Media/Video";
import IPostDocument from "../../../Schemas/Mongo/Post/IPostDocument";

const IMAGE_TYPE = "IMAGE";

const InstagramPostEntityTransform: Transformer<IPostDocument, IInstagramPost> = (post) => {
    const instagramPostBuilder = new InstagramPostBuilder();
    instagramPostBuilder
        .setId(post._id)
        .setChannelId(post.channelId)
        .setCreatorId(post.creatorId)
        .setPostId(post.instagram.id)
        .setLikes(parseInt(post.instagram.likes))
        .setTakenAt(post.instagram.takenAt)
        .setCaption(post.instagram.caption)
        .setMedia(post.instagram.media.map((mediaItem) => transformInstagramMedia(mediaItem)))
        .setThumbnail(new Image("", post.instagram.thumbnail.url, 0, 0))
        .setCommentCount(post.instagram.commentCount)
        .setCommentCursor(post.instagram.commentCursor);
    return instagramPostBuilder.build();
};

const transformInstagramMedia: Transformer<
    {
        url: string;
        type: string;
    },
    IMedia
> = (instagramMedia) =>
    isImage(instagramMedia.type)
        ? new Image("", instagramMedia.url, 0, 0)
        : new Video("", instagramMedia.url, 0, 0, new Image("", "", 0, 0));

const isImage: Transformer<string, boolean> = (type: string) => {
    return type === IMAGE_TYPE;
};

export default InstagramPostEntityTransform;
