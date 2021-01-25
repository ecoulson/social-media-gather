import { Transformer } from "../../../@Types";
import IYouTubeVideo from "../../../Entities/YouTubeVideo/IYouTubeVideo";
import IPostDocument from "../../../Schemas/Mongo/Post/IPostDocument";

const YouTubeVideoDocumentTransform: Transformer<IYouTubeVideo, Partial<IPostDocument>> = (
    post
) => {
    return {
        type: "YOUTUBE_VIDEO",
        channelId: post.channelId(),
        timeCreated: post.publishedAt(),
        youtubeVideo: {
            publishedAt: post.publishedAt(),
            videoId: post.videoId(),
            thumbnailUrl: post.thumbnailUrl(),
            title: post.title(),
            commentCount: post.commentCount(),
            likes: post.likes(),
            dislikes: post.dislikes(),
            views: post.views()
        }
    };
};

export default YouTubeVideoDocumentTransform;
