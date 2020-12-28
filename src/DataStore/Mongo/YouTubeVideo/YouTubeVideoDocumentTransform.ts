import { UpdateQuery } from "mongoose";
import { Transformer } from "../../../@Types";
import IYouTubeVideo from "../../../Entities/YouTubeVideo/IYouTubeVideo";
import IPostDocument from "../Models/Post/IPostDocument";

const YouTubeVideoDocumentTransform: Transformer<IYouTubeVideo, UpdateQuery<IPostDocument>> = (
    post
) => {
    return {
        userId: post.userId(),
        youtubeVideo: {
            publishedAt: post.publishedAt(),
            videoId: post.videoId(),
            thumbnailUrl: post.thumbnailUrl(),
            title: post.title()
        }
    };
};

export default YouTubeVideoDocumentTransform;
