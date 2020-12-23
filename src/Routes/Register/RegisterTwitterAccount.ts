import { Router } from "express";
import Post from "../../DataStore/Mongo/Models/Post/PostModel";
import requiresAuth from "../../Middleware/RequiresAuth";
const TwitterSearchEndpoint = "https://api.twitter.com/1.1/users/lookup.json";
import User from "../../DataStore/Mongo/Models/User/UserModel";
const TwitterTweetTimelineEndpoint = "https://api.twitter.com/1.1/statuses/user_timeline.json";
import axios from "axios";
import bigInt from "big-integer";
const router = Router();

router.get("/", async (req, res) => {
    res.json(await getTwitterUsers(req.query.username as string));
});

async function getTwitterUsers(userHandle : string) {
    const response = await axios.get(`${TwitterSearchEndpoint}?screen_name=${userHandle}`, {
        headers: {
            "Authorization": `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
        }
    });
    const formattedUsers = response.data.map((user : any) => {
        return {
            id: user.id_str,
            username: user.screen_name,
            profilePicture: user.profile_image_url
        }
    })
    return formattedUsers;
}

router.post("/", requiresAuth(), async (req, res) => {
    res.json(await registerAccount(req.user, req.body.id));
});

router.post("/add", async (req, res) => {
    const user = await User.findOne({ _id: req.body.userId });
    res.json(await registerAccount(user, req.body.id))
});

async function registerAccount(user : any, twitterId : string) {
    user.twitterId = twitterId;
    await createTwitterPostsForUser(twitterId, user.id);
    return await user.save();
}

async function createTwitterPostsForUser(twitterId : string, userId : string) {
    const tweets = await getTwitterPosts(twitterId);
    await Promise.all(tweets.map((tweet : any) => createPostFromTweet(tweet, userId)));
}

async function getTwitterPosts(twitterId : string) {
    let response = await axios.get(`${TwitterTweetTimelineEndpoint}?user_id=${twitterId}&count=200&tweet_mode=extended&exclude_replies=true`, {
        headers: {
            "Authorization": `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
        }
    });
    const userResponse = await axios.get(`${TwitterSearchEndpoint}?user_id=${twitterId}`, {
        headers: {
            "Authorization": `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
        }
    });
    const user = userResponse.data[0];
    let tweets = response.data;
    while (tweets.length < user.statuses_count) {
        console.log(getMinId(tweets));
        response = await axios.get(
            `${TwitterTweetTimelineEndpoint}?user_id=${twitterId}&max_id=${getMinId(tweets)}&count=200&tweet_mode=extended&exclude_replies=true`, 
        {
            headers: {
                "Authorization": `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
            }
        });
        tweets = tweets.concat(response.data);
    }
    console.log("here")
    return tweets;
}

function getMinId(tweets : any[]) {
    let minId = bigInt(tweets[0].id_str);
    for (let i = 0; i < tweets.length; i++) {
        if (bigInt(tweets[i].id_str).lt(minId)) {
            minId = bigInt(tweets[i].id_str);
        }
    }
    return minId;
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

function getMedia(tweet: any) {
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

export default router;