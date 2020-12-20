import Post from "../Models/Post";
import User from "../Models/User";
import axios from "axios";
const TwitterTweetTimelineEndpoint = "https://api.twitter.com/1.1/statuses/user_timeline.json";

async function getAllTwitterUsers() {
    return (await User.find()).filter((user : any) => user.twitterId);
}

async function updatePosts() {
    const users = await getAllTwitterUsers();
    await Promise.all(users.map((user : any)=> createTwitterPostsForUser(user.twitterId, user.id)));
}

async function createTwitterPostsForUser(twitterId : string, userId : string) {
    const tweets = await getTwitterPosts(twitterId);
    await Promise.all(tweets.map(async (tweet : any) => {
        if (await Post.findOne({ "tweet.id": tweet.id_str })) {
            return Promise.resolve();
        }
        return createPostFromTweet(tweet, userId);
    }));
}

async function getTwitterPosts(twitterId : string) {
    let response = await axios.get(`${TwitterTweetTimelineEndpoint}?user_id=${twitterId}&count=200&tweet_mode=extended`, {
        headers: {
            "Authorization": `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
        }
    });
    return response.data;
}

async function createPostFromTweet(tweet : any, userId : string) {
    const post = new Post({
        type: "TWEET",
        timeCreated: new Date(tweet.created_at),
        userId: userId,
        tweet: {
            id: tweet.id_str,
            text: tweet.full_text,
            publishedAt: new Date(tweet.created_at),
            screenName: tweet.user.screen_name,
            hashtags: tweet.entities.hashtags.map((hashtag : any) => hashtag.text),
            urls: getUrls(tweet),
            userMentions: getUserMentions(tweet),
            media: getMedia(tweet)
        }
    })
    return post.save();
}

function getUrls(tweet : any) {
    if (!tweet.entities.urls) {
        return [];
    }
    return tweet.entities.urls.map((url : any) => {
        return {
            url: url.url,
            expandedUrl: url.expanded_url,
            displayUrl: url.display_url
        }
    })
}

function getUserMentions(tweet : any) {
    if (!tweet.entities.user_mentions) {
        return [];
    }
    return tweet.entities.user_mentions.map((userMention : any) => {
        return {
            id: userMention.id_str,
            screenName: userMention.screen_name
        }
    })
}

function getMedia(tweet : any) {
    if (tweet.extended_entities && tweet.extended_entities.media) {
        return tweet.extended_entities.media.map((media : any) => {
            let mediaUrl = media.media_url;
            if (media.video_info) {
                const sortedVariants = media.video_info.variants
                    .filter((variant : any) => variant.bitrate)
                    .sort((a : any, b : any) => a.bitrate - b.bitrate);
                if (sortedVariants[sortedVariants.length - 1]) {
                    mediaUrl = sortedVariants[sortedVariants.length - 1].url;
                }
            }
            return {
                id: media.id_str,
                thumbnailUrl: media.media_url,
                url: mediaUrl,
                type: media.type,
            }
        })
    } else if (tweet.entities && tweet.entities.media) {
        return tweet.entities.media.map((media : any) => {
            return {
                id: media.id_str,
                thumbnailUrl: media.media_url,
                url: media.media_url,
                type: media.type,
            }
        })
    } else {
        return []
    }
}

export default updatePosts;