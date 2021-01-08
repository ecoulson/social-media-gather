import { Transformer } from "../@Types";
import IYouTubeVideo from "../Entities/YouTubeVideo/IYouTubeVideo";
import IYouTubeVideoJSONSchema from "../Schemas/JSON/YouTubeVideo/IYouTubeVideoJSONSchema";

const YouTubeVideoJSONSerializer: Transformer<IYouTubeVideo, IYouTubeVideoJSONSchema> = (
    youTubeVideo
) => {
    return {
        publishedAt: youTubeVideo.publishedAt(),
        thumbnailUrl: youTubeVideo.thumbnailUrl(),
        title: youTubeVideo.title(),
        videoId: youTubeVideo.videoId()
    };
};

export default YouTubeVideoJSONSerializer;
