const router = require("express").Router();
const User = require('../../Models/User');
const Post = require('../../Models/Post');
const TwitterSearchEndpoint = "https://api.twitter.com/1.1/users/lookup.json";
const TwitterTweetTimelineEndpoint = "https://api.twitter.com/1.1/statuses/user_timeline.json";
const axios = require("axios").default;

router.get("/", async (req, res) => {
    res.json(await getTwitterUsers(req.query.username));
});

async function getTwitterUsers(userHandle) {
    const response = await axios.get(`${TwitterSearchEndpoint}?screen_name=${userHandle}`, {
        headers: {
            "Authorization": `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
        }
    });
    const formattedUsers = response.data.map((user) => {
        return {
            id: user.id_str,
            username: user.screen_name,
            profilePicture: user.profile_image_url
        }
    })
    return formattedUsers;
}

router.post("/:id", async (req, res) => {
    res.json(await registerAccount(req.params.id, req.body.id));
})

async function registerAccount(userId, twitterId) {
    const user = await User.findById(userId);
    user.twitterId = twitterId;
    await createTwitterPostsForUser(twitterId);
    return await user.save();
}

async function createTwitterPostsForUser(twitterId) {
    const tweets = await getTwitterPosts(twitterId);
    await Promise.all(tweets.map((tweet) => createPostFromTweet(tweet)));
}

async function getTwitterPosts(twitterId) {
    let response = await axios.get(`${TwitterTweetTimelineEndpoint}?user_id=${twitterId}&count=200&tweet_mode=extended`, {
        headers: {
            "Authorization": `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
        }
    });
    return response.data;
}

async function createPostFromTweet(tweet) {
    const post = new Post({
        type: "TWEET",
        timeCreated: new Date(tweet.created_at),
        userId: tweet.user.id_str,
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
    })
    return post.save();
}

function getUrls(tweet) {
    if (!tweet.entities.urls) {
        return [];
    }
    return tweet.entities.urls.map((url) => {
        return {
            url: url.url,
            expandedUrl: url.expanded_url,
            displayUrl: url.display_url
        }
    })
}

function getUserMentions(tweet) {
    if (!tweet.entities.user_mentions) {
        return [];
    }
    return tweet.entities.user_mentions.map((userMention) => {
        return {
            id: userMention.id_str,
            screenName: userMention.screen_name
        }
    })
}

function getMedia(tweet) {
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
                type: media.type,
            }
        })
    } else if (tweet.entities && tweet.entities.media) {
        return tweet.entities.media.map((media) => {
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

module.exports = router;