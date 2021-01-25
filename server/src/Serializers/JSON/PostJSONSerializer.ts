import { Transformer } from "../../@Types";
import IInstagramPost from "../../Entities/InstagramPost/IInstagramPost";
import IPost from "../../Entities/Post/IPost";
import PostType from "../../Entities/Post/PostType";
import ITweet from "../../Entities/Tweet/ITweet";
import ITwitchStream from "../../Entities/TwitchStream/ITwitchStream";
import ITwitchVideo from "../../Entities/TwitchVideo/ITwitchVideo";
import IYouTubeVideo from "../../Entities/YouTubeVideo/IYouTubeVideo";
import { IPostJSONSchema } from "../../Schemas/JSON/Post/IPostJSONSchema";
import InstagramJSONSerializer from "./InstagramJSONSerializer";
import TweetJSONSerializer from "./TweetJSONSerializer";
import TwitchStreamJSONSerializer from "./TwitchStreamJSONSerializer";
import TwitchVideoJSONSerializer from "./TwitchVideoJSONSerializer";
import YouTubeVideoJSONSerializer from "./YouTubeVideoJSONSerializer";

const PostJSONSerializer: Transformer<IPost, IPostJSONSchema> = (postEntity) => {
    switch (postEntity.type()) {
        case PostType.INSTAGRAM_POST:
            const instagram = postEntity as IInstagramPost;
            return {
                id: postEntity.id(),
                type: postEntity.type(),
                timeCreated: instagram.takenAt(),
                channelId: instagram.channelId(),
                instagram: InstagramJSONSerializer(instagram)
            };
        case PostType.TWEET:
            const tweet = postEntity as ITweet;
            return {
                id: postEntity.id(),
                type: tweet.type(),
                timeCreated: tweet.publishedAt(),
                channelId: tweet.channelId(),
                tweet: TweetJSONSerializer(tweet)
            };
        case PostType.TWITCH_STREAM:
            const twitchStream = postEntity as ITwitchStream;
            return {
                id: postEntity.id(),
                type: twitchStream.type(),
                timeCreated: twitchStream.startedAt(),
                channelId: twitchStream.channelId(),
                twitchStream: TwitchStreamJSONSerializer(twitchStream)
            };
        case PostType.TWITCH_VIDEO:
            const twitchVideo = postEntity as ITwitchVideo;
            return {
                id: postEntity.id(),
                type: twitchVideo.type(),
                timeCreated: twitchVideo.publishedAt(),
                channelId: twitchVideo.channelId(),
                twitchVideo: TwitchVideoJSONSerializer(twitchVideo)
            };
        case PostType.YOUTUBE_VIDEO:
            const youTubeVideo = postEntity as IYouTubeVideo;
            return {
                id: postEntity.id(),
                type: youTubeVideo.type(),
                timeCreated: youTubeVideo.publishedAt(),
                channelId: youTubeVideo.channelId(),
                youtubeVideo: YouTubeVideoJSONSerializer(youTubeVideo)
            };
    }
};

export default PostJSONSerializer;
