import { Transformer } from "../../../@Types";
import IInstagramPost from "../../../Entities/InstagramPost/IInstagramPost";
import InstagramPost from "../../../Entities/InstagramPost/InstagramPost";
import Image from "../../../Entities/Media/Image";
import IMedia from "../../../Entities/Media/IMedia";
import Video from "../../../Entities/Media/Video";
import IPostDocument from "../Models/Post/IPostDocument";

const IMAGE_TYPE = "IMAGE";

const InstagramPostEntityTransform: Transformer<IPostDocument, IInstagramPost> = (post) => {
    return new InstagramPost(
        post._id,
        post.userId,
        post.instagram.id,
        parseInt(post.instagram.likes),
        post.instagram.takenAt,
        post.instagram.caption,
        post.instagram.media.map((mediaItem) => transformInstagramMedia(mediaItem)),
        new Image("", post.instagram.thumbnail.url, 0, 0)
    );
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
