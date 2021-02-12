import { Transformer } from "../../@Types";
import IYouTubeVideo from "../../Entities/YouTubeVideo/IYouTubeVideo";
import IYouTubeVideoJSONSchema from "../../Schemas/JSON/YouTubeVideo/IYouTubeVideoJSONSchema";

const YouTubeVideoJSONSerializer: Transformer<IYouTubeVideo, IYouTubeVideoJSONSchema> = (
    youTubeVideo
) => {
    return {
        publishedAt: youTubeVideo.publishedAt(),
        thumbnailUrl: youTubeVideo.thumbnailUrl(),
        title: youTubeVideo.title(),
        videoId: youTubeVideo.videoId(),
        likes: youTubeVideo.likes(),
        dislikes: youTubeVideo.dislikes(),
        commentCount: youTubeVideo.commentCount(),
        views: youTubeVideo.views(),
        commentPageToken: youTubeVideo.commentPageToken()
    };
};

export default YouTubeVideoJSONSerializer;
