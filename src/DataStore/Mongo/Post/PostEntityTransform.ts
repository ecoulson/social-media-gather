import { Transformer } from "../../../@Types";
import IPost from "../../../Entities/Post/IPost";
import InstagramPostEntityTransform from "../InstagramPost/InstagramPostEntityTransform";
import IPostDocument from "../../../Schemas/Mongo/Post/IPostDocument";
import TweetEntityTransform from "../Tweet/TweetEntityTransform";
import TwitchStreamEntityTransform from "../TwitchStream/TwitchStreamEntityTransform";
import TwitchVideoEntityTransform from "../TwitchVideo/TwitchVideoEntityTransform";
import YouTubeVideoEntityTransform from "../YouTubeVideo/YouTubeVideoEntityTransform";

const PostEntityTransform: Transformer<IPostDocument, IPost> = (postDocument: IPostDocument) => {
    switch (postDocument.type) {
        case "YOUTUBE_VIDEO":
            return YouTubeVideoEntityTransform(postDocument);
        case "TWITCH_STREAM":
            return TwitchStreamEntityTransform(postDocument);
        case "TWITCH_VIDEO":
            return TwitchVideoEntityTransform(postDocument);
        case "TWEET":
            return TweetEntityTransform(postDocument);
        case "INSTAGRAM":
            return InstagramPostEntityTransform(postDocument);
    }
};

export default PostEntityTransform;
