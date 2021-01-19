import Post from "../Schemas/Mongo/Post/PostModel";
import User from "../Schemas/Mongo/User/UserModel";
import axios from "axios";
import ITweetSchema from "../Libraries/Twitter/Schema/ITweetSchema";
import container from "../bootstrap";
import IConfig from "../Config/IConfig";
import Types from "../@Types/Types";
import IMedia from "../Entities/Media/IMedia";
const TwitterTweetTimelineEndpoint = "https://api.twitter.com/1.1/statuses/user_timeline.json";

async function getAllTwitterUsers() {
    return (await User.find()).filter((user) => user.twitterId);
}

async function TwitterRefreshJob(): Promise<void> {
    const users = await getAllTwitterUsers();
    await Promise.all(users.map((user) => createTwitterPostsForUser(user.twitterId, user.id)));
}

async function createTwitterPostsForUser(twitterId: string, userId: string) {
    const tweets = await getTwitterPosts(twitterId);
    await Promise.all(
        tweets.map(async (tweet) => {
            const post = await Post.findOne({ "tweet.id": tweet.id_str });
            if (post !== null) {
                post.tweet.favorites = tweet.favorite_count;
                post.tweet.retweetCount = tweet.retweet_count;
                await post.save();
                return Promise.resolve();
            }
            return createPostFromTweet(tweet, userId);
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

async function createPostFromTweet(tweet: ITweetSchema, userId: string) {
    const post = new Post({
        type: "TWEET",
        timeCreated: new Date(tweet.created_at),
        userId: userId,
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
                .map((mediaItem) => this.createImageFromMediaItem(mediaItem))
        );
    }
    if (hasMedia(tweet)) {
        media = media.concat(
            tweet.extended_entities.media
                .filter((mediaItem) => mediaItem.type === "video")
                .map((mediaItem) => this.createVideoFromMediaItem(mediaItem))
                .filter((mediaItem) => mediaItem !== null)
        );
    }
    return media;
}

function hasMedia(tweet: ITweetSchema): boolean {
    return tweet.extended_entities !== undefined && tweet.extended_entities.media !== undefined;
}

export default TwitterRefreshJob;
