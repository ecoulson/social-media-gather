import Post from "../Schemas/Mongo/Post/PostModel";
import axios from "axios";
import ITweetSchema from "../Libraries/Twitter/Schema/ITweetSchema";
import container from "../bootstrap";
import IConfig from "../Config/IConfig";
import Types from "../@Types/Types";
import IMedia from "../Entities/Media/IMedia";
import ITwitterMediaSchema from "../Libraries/Twitter/Schema/ITwitterMediaSchema";
import ITwitterVideoVariant from "../Libraries/Twitter/Schema/ITwitterVideoVariant";
import Video from "../Entities/Media/Video";
import Image from "../Entities/Media/Image";
import ChannelModel from "../Schemas/Mongo/Channel/ChannelModel";
import UserModel from "../Schemas/Mongo/User/UserModel";
import Platform from "../Entities/Platform/Platform";
import IChannelDocument from "../Schemas/Mongo/Channel/IChannelDocument";
const TwitterTweetTimelineEndpoint = "https://api.twitter.com/1.1/statuses/user_timeline.json";

async function getAllTwitterChannels() {
    return (await ChannelModel.find()).filter((channel) => channel.platform === Platform.TWITTER);
}

async function TwitterRefreshJob(): Promise<void> {
    const channels = await getAllTwitterChannels();
    await Promise.all(channels.map((channel) => createTwitterPostsForChannel(channel)));
}

async function createTwitterPostsForChannel(channel: IChannelDocument) {
    const tweets = await getTwitterPosts(channel.platformId);
    await Promise.all(
        tweets.map(async (tweet) => {
            const post = await Post.findOne({ "tweet.id": tweet.id_str });
            if (post !== null) {
                post.tweet.favorites = tweet.favorite_count;
                post.tweet.retweetCount = tweet.retweet_count;
                await post.save();
                return Promise.resolve();
            }
            return createPostFromTweet(tweet, channel.id);
        })
    );
}

async function getTwitterPosts(twitterId: string): Promise<ITweetSchema[]> {
    const config = container.get<IConfig>(Types.Config);
    const response = await axios.get(
        `${TwitterTweetTimelineEndpoint}?user_id=${twitterId}&count=200&tweet_mode=extended`,
        {
            headers: {
                Authorization: `Bearer ${await config.getValue("TWITTER_BEARER_TOKEN")}`
            }
        }
    );
    return response.data;
}

async function createPostFromTweet(tweet: ITweetSchema, channelId: string) {
    const creators = await UserModel.find({
        channels: {
            $in: [channelId]
        }
    });
    creators.map((creator) => {
        const post = new Post({
            type: "TWEET",
            timeCreated: new Date(tweet.created_at),
            channelId: channelId,
            creatorId: creator.id,
            tweet: {
                id: tweet.id_str,
                text: tweet.full_text,
                publishedAt: new Date(tweet.created_at),
                screenName: tweet.user.screen_name,
                hashtags: tweet.entities.hashtags.map((hashtag) => hashtag.text),
                urls: getUrls(tweet),
                userMentions: getUserMentions(tweet),
                media: getMedia(tweet),
                favorites: tweet.favorite_count,
                retweetCount: tweet.retweet_count
            }
        });
        return post.save();
    });
}

function getUrls(tweet: ITweetSchema) {
    if (!tweet.entities.urls) {
        return [];
    }
    return tweet.entities.urls.map((url) => {
        return {
            url: url.url,
            expandedUrl: url.expanded_url,
            displayUrl: url.display_url
        };
    });
}

function getUserMentions(tweet: ITweetSchema) {
    if (!tweet.entities.user_mentions) {
        return [];
    }
    return tweet.entities.user_mentions.map((userMention) => {
        return {
            id: userMention.id_str,
            screenName: userMention.screen_name
        };
    });
}

function getMedia(tweet: ITweetSchema) {
    let media: IMedia[] = [];
    if (hasMedia(tweet)) {
        media = media.concat(
            tweet.extended_entities.media
                .filter(
                    (mediaItem) => mediaItem.type === "photo" || mediaItem.type === "animated_gif"
                )
                .map((mediaItem) => createImageFromMediaItem(mediaItem))
        );
    }
    if (hasMedia(tweet)) {
        media = media.concat(
            tweet.extended_entities.media
                .filter((mediaItem) => mediaItem.type === "video")
                .map((mediaItem) => createVideoFromMediaItem(mediaItem))
                .filter((mediaItem) => mediaItem !== null)
        );
    }
    return media;
}

function hasMedia(tweet: ITweetSchema): boolean {
    return tweet.extended_entities !== undefined && tweet.extended_entities.media !== undefined;
}

function createVideoFromMediaItem(media: ITwitterMediaSchema): Video {
    let variant: ITwitterVideoVariant = null;
    if (media.video_info) {
        const sortedVariants = media.video_info.variants
            .filter((variant) => variant.bitrate)
            .sort((a, b) => a.bitrate - b.bitrate);
        if (sortedVariants[sortedVariants.length - 1]) {
            variant = sortedVariants[sortedVariants.length - 1];
        }
    }
    if (variant) {
        return new Video(media.id_str, variant.url, 0, 0, new Image("", media.media_url, 0, 0));
    } else {
        return null;
    }
}

function createImageFromMediaItem(media: ITwitterMediaSchema): Image {
    return new Image(media.id_str, media.media_url, 0, 0);
}

export default TwitterRefreshJob;
