import IYouTubeVideo from "../../Entities/YouTubeVideo/IYouTubeVideo";
import YouTubeVideoBuilder from "../../Entities/YouTubeVideo/YouTubeVideoBuilder";
import IPostJSONSchema from "../../Schemas/JSON/Post/IPostJSONSchema";

export default function YouTubeVideoJSONDeserializer(schema: IPostJSONSchema): IYouTubeVideo {
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
