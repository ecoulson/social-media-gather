import { Transformer } from "../../../@Types";
import IInstagramPost from "../../../Entities/InstagramPost/IInstagramPost";
import IPost from "../../../Entities/Post/IPost";
import PostType from "../../../Entities/Post/PostType";
import ITweet from "../../../Entities/Tweet/ITweet";
import ITwitchStream from "../../../Entities/TwitchStream/ITwitchStream";
import ITwitchVideo from "../../../Entities/TwitchVideo/ITwitchVideo";
import IYouTubeVideo from "../../../Entities/YouTubeVideo/IYouTubeVideo";
import InstagramPostDocumentTransform from "../InstagramPost/InstagramPostDocumentTransform";
import IPostDocument from "../../../Schemas/Mongo/Post/IPostDocument";
import TweetDocumentTransform from "../Tweet/TweetDocumentTransform";
import TwitchStreamDocumentTransform from "../TwitchStream/TwitchStreamDocumentTransform";
import TwitchVideoDocumentTransform from "../TwitchVideo/TwitchVideoDocumentTransform";
import YouTubeVideoDocumentTransform from "../YouTubeVideo/YouTubeVideoDocumentTransform";

const PostDocumentTransform: Transformer<IPost, Partial<IPostDocument>> = (postEntity) => {
    switch (postEntity.type()) {
        case PostType.INSTAGRAM_POST:
            return InstagramPostDocumentTransform(postEntity as IInstagramPost);
        case PostType.TWEET:
            return TweetDocumentTransform(postEntity as ITweet);
        case PostType.TWITCH_STREAM:
            return TwitchStreamDocumentTransform(postEntity as ITwitchStream);
        case PostType.TWITCH_VIDEO:
            return TwitchVideoDocumentTransform(postEntity as ITwitchVideo);
        case PostType.YOUTUBE_VIDEO:
            return YouTubeVideoDocumentTransform(postEntity as IYouTubeVideo);
    }
};

export default PostDocumentTransform;
