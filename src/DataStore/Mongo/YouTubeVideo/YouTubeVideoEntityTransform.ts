import { Transformer } from "../../../@Types";
import IYouTubeVideo from "../../../Entities/YouTubeVideo/IYouTubeVideo";
import YouTubeVideo from "../../../Entities/YouTubeVideo/YouTubeVideo";
import UserRecord from "../../../Records/User/UserRecord";
import IPostDocument from "../Models/Post/IPostDocument";
import UserMongoDataStore from "../User/UserMongoDataStore";

const YouTubeVideoEntityTransform : Transformer<IPostDocument, IYouTubeVideo> = (post) => {
    return new YouTubeVideo(
        post.id,
        post.userId,
        post.youtubeVideo.publishedAt,
        post.youtubeVideo.thumbnailUrl,
        post.youtubeVideo.title,
        post.youtubeVideo.videoId,
        new UserRecord(new UserMongoDataStore())
    );
}

export default YouTubeVideoEntityTransform;