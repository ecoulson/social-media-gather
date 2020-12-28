import { Transformer } from "../../../@Types";
import IYouTubeVideo from "../../../Entities/YouTubeVideo/IYouTubeVideo";
import YouTubeVideo from "../../../Entities/YouTubeVideo/YouTubeVideo";
import IPostDocument from "../Models/Post/IPostDocument";

const YouTubeVideoEntityTransform: Transformer<IPostDocument, IYouTubeVideo> = (post) => {
    return new YouTubeVideo(
        post.id,
        post.userId,
        post.youtubeVideo.publishedAt,
        post.youtubeVideo.thumbnailUrl,
        post.youtubeVideo.title,
        post.youtubeVideo.videoId
    );
};

export default YouTubeVideoEntityTransform;
