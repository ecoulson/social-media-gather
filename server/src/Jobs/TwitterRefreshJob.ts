import Post from "../Schemas/Mongo/Post/PostModel";
import User from "../Schemas/Mongo/User/UserModel";
import axios from "axios";
import ITweetSchema from "../Library/Twitter/Schema/ITweetSchema";
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
            if (await Post.findOne({ "tweet.id": tweet.id_str })) {
                return Promise.resolve();
            }
            return createPostFromTweet(tweet, userId);
        })
    );
}

async function getTwitterPosts(twitterId: string): Promise<ITweetSchema[]> {
    const response = await axios.get(
        `${TwitterTweetTimelineEndpoint}?user_id=${twitterId}&count=200&tweet_mode=extended`,
        {
            headers: {
                Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
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
            media: getMedia(tweet)
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
    if (tweet.extended_entities && tweet.extended_entities.media) {
        return tweet.extended_entities.media.map((media) => {
            let mediaUrl = media.media_url;
            if (media.video_info) {
                const sortedVariants = media.video_info.variants
                    .filter((variant) => variant.bitrate)
                    .sort((a, b) => a.bitrate - b.bitrate);
                if (sortedVariants[sortedVariants.length - 1]) {
                    mediaUrl = sortedVariants[sortedVariants.length - 1].url;
                }
            }
            return {
                id: media.id_str,
                thumbnailUrl: media.media_url,
                url: mediaUrl,
                type: media.type
            };
        });
    } else if (tweet.entities && tweet.entities.media) {
        return tweet.entities.media.map((media) => {
            return {
                id: media.id_str,
                thumbnailUrl: media.media_url,
                url: media.media_url,
                type: media.type
            };
        });
    } else {
        return [];
    }
}

export default TwitterRefreshJob;
