import YouTubeVideoBuilder from "../../../Entities/YouTubeVideo/YouTubeVideoBuilder";
import { Transformer } from "../../../@Types";
import IYouTubeVideo from "../../../Entities/YouTubeVideo/IYouTubeVideo";
import IPostDocument from "../../../Schemas/Mongo/Post/IPostDocument";

const YouTubeVideoEntityTransform: Transformer<IPostDocument, IYouTubeVideo> = (post) => {
    const youTubeVideoBuilder = new YouTubeVideoBuilder();
    youTubeVideoBuilder
        .setId(post.id)
        .setUserId(post.userId)
        .setPublishedAt(post.youtubeVideo.publishedAt)
        .setThumbnailUrl(post.youtubeVideo.thumbnailUrl)
        .setTitle(post.youtubeVideo.title)
        .setVideoId(post.youtubeVideo.videoId)
        .setViews(post.youtubeVideo.views)
        .setLikes(post.youtubeVideo.likes)
        .setDislikes(post.youtubeVideo.dislikes)
        .setCommentCount(post.youtubeVideo.commentCount);
    return youTubeVideoBuilder.build();
};

export default YouTubeVideoEntityTransform;
