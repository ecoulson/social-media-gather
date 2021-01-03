import { UpdateQuery } from "mongoose";
import { Transformer } from "../../../@Types";
import IYouTubeVideo from "../../../Entities/YouTubeVideo/IYouTubeVideo";
import IPostDocument from "../../../Schemas/Mongo/Post/IPostDocument";

const YouTubeVideoDocumentTransform: Transformer<IYouTubeVideo, UpdateQuery<IPostDocument>> = (
    post
) => {
    return {
        type: "YOUTUBE_VIDEO",
        userId: post.userId(),
        timeCreated: post.publishedAt(),
        youtubeVideo: {
            publishedAt: post.publishedAt(),
            videoId: post.videoId(),
            thumbnailUrl: post.thumbnailUrl(),
            title: post.title()
        }
    };
};

export default YouTubeVideoDocumentTransform;