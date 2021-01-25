import { Transformer } from "../../../@Types";
import IInstagramPost from "../../../Entities/InstagramPost/IInstagramPost";
import IImage from "../../../Entities/Media/IImage";
import IMedia from "../../../Entities/Media/IMedia";
import IVideo from "../../../Entities/Media/IVideo";
import IInstagramMediaDocument from "../../../Schemas/Mongo/Post/IInstagramMediaDocument";
import IPostDocument from "../../../Schemas/Mongo/Post/IPostDocument";

const InstagramPostDocumentTransform: Transformer<IInstagramPost, Partial<IPostDocument>> = (
    post
) => {
    return {
        type: "INSTAGRAM",
        channelId: post.channelId(),
        timeCreated: post.takenAt(),
        instagram: {
            takenAt: post.takenAt(),
            thumbnail: transformMediaEntity(post.thumbnail()),
            media: post.media().map((mediaItem) => transformMediaEntity(mediaItem)),
            caption: post.caption(),
            likes: post.likes().toString(),
            id: post.postId(),
            commentCount: post.commentCount()
        }
    };
};

const transformMediaEntity: Transformer<IMedia, IInstagramMediaDocument> = (
    media: IImage | IVideo
) => {
    return {
        url: media.url(),
        type: media.type()
    };
};

export default InstagramPostDocumentTransform;
