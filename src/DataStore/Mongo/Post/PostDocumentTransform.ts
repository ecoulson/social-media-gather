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

const PostDocumentTransform: Transformer<IPost, IPostDocument> = (postEntity) => {
    switch (postEntity.type()) {
        case PostType.INSTAGRAM_POST:
            const instagramPost = postEntity as IInstagramPost;
            return {
                type: "INSTAGRAM",
                timeCreated: instagramPost.takenAt(),
                userId: instagramPost.userId(),
                instagram: InstagramPostDocumentTransform(instagramPost)
            } as IPostDocument;
        case PostType.TWEET:
            const tweet = postEntity as ITweet;
            return {
                type: "TWEET",
                timeCreated: tweet.publishedAt(),
                userId: tweet.userId(),
                tweet: TweetDocumentTransform(tweet)
            } as IPostDocument;
        case PostType.TWITCH_STREAM:
            const twitchStream = postEntity as ITwitchStream;
            return {
                type: "TWITCH_STREAM",
                timeCreated: twitchStream.startedAt(),
                userId: twitchStream.userId(),
                twitchStream: TwitchStreamDocumentTransform(twitchStream)
            } as IPostDocument;
        case PostType.TWITCH_VIDEO:
            const twitchVideo = postEntity as ITwitchVideo;
            return {
                type: "TWITCH_VIDEO",
                timeCreated: twitchVideo.publishedAt(),
                userId: twitchVideo.userId(),
                twitchVideo: TwitchVideoDocumentTransform(twitchVideo)
            } as IPostDocument;
        case PostType.YOUTUBE_VIDEO:
            const youtubeVideo = postEntity as IYouTubeVideo;
            return {
                type: "YOUTUBE_VIDEO",
                timeCreated: youtubeVideo.publishedAt(),
                userId: youtubeVideo.userId(),
                youtubeVideo: YouTubeVideoDocumentTransform(youtubeVideo)
            } as IPostDocument;
    }
};

export default PostDocumentTransform;
