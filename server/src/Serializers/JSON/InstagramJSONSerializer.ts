import { Transformer } from "../../@Types";
import IInstagramPost from "../../Entities/InstagramPost/IInstagramPost";
import Image from "../../Entities/Media/Image";
import IMedia from "../../Entities/Media/IMedia";
import MediaType from "../../Entities/Media/MediaType";
import Video from "../../Entities/Media/Video";
import IInstagramJSONSchema from "../../Schemas/JSON/Instagram/IInstagramJSONSchema";
import IInstagramMediaJSONSchema from "../../Schemas/JSON/Instagram/IInstagramMediaJSONSchema";

const InstagramJSONSerializer: Transformer<IInstagramPost, IInstagramJSONSchema> = (
    instagramPost
) => {
    return {
        takenAt: instagramPost.takenAt(),
        id: instagramPost.postId(),
        likes: instagramPost.likes(),
        caption: instagramPost.caption(),
        media: instagramPost.media().map((media) => InstagramMediaJSONSerializer(media)),
        thumbnail: InstagramMediaJSONSerializer(instagramPost.thumbnail()),
        commentCount: instagramPost.commentCount(),
        commentCursor: instagramPost.commentCursor()
    };
};

const InstagramMediaJSONSerializer: Transformer<IMedia, IInstagramMediaJSONSchema> = (media) => {
    return {
        type: media.type(),
        url: media.isType(MediaType.IMAGE) ? (media as Image).url() : (media as Video).url()
    };
};

export default InstagramJSONSerializer;
