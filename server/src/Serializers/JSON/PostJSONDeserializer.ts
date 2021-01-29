import { Transformer } from "../../@Types";
import IPost from "../../Entities/Post/IPost";
import PostType from "../../Entities/Post/PostType";
import IYouTubeVideo from "../../Entities/YouTubeVideo/IYouTubeVideo";
import YouTubeVideoBuilder from "../../Entities/YouTubeVideo/YouTubeVideoBuilder";
import { IPostJSONSchema } from "../../Schemas/JSON/Post/IPostJSONSchema";

const PostJSONDeserializer: Transformer<IPostJSONSchema, IPost> = (schema) => {
    switch (schema.type) {
        case PostType.YOUTUBE_VIDEO:
            return DeserializeYouTubeVideo(schema);
        default:
            throw new Error("Unrecognized post to deserialize");
    }
};

function DeserializeYouTubeVideo(schema: IPostJSONSchema): IYouTubeVideo {
    const youtubeVideoBuilder = new YouTubeVideoBuilder();
    youtubeVideoBuilder
        .setChannelId(schema.channelId)
        .setCommentCount(schema.youtubeVideo.commentCount)
        .setCommentPageToken(schema.youtubeVideo.commentPageToken)
        .setCreatorId(schema.creatorId)
        .setDislikes(schema.youtubeVideo.dislikes)
        .setId(schema.id)
        .setLikes(schema.youtubeVideo.likes)
        .setPublishedAt(schema.timeCreated)
        .setThumbnailUrl(schema.youtubeVideo.thumbnailUrl)
        .setTitle(schema.youtubeVideo.title)
        .setVideoId(schema.youtubeVideo.videoId)
        .setViews(schema.youtubeVideo.views);
    return youtubeVideoBuilder.build();
}

export default PostJSONDeserializer;
