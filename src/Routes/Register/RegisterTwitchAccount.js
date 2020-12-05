const router = require("express").Router();
const Post = require('../../Models/Post');
const User = require("../../Models/User");
const Webhook = require('../../Models/Webhook');
const requiresAuth = require("../../Middleware/RequiresAuth");
const Axios = require("axios").default

router.get("/", async (req, res) => {
    res.json(await getUsers(req.query.username))
});

async function getUsers(username) {
    return await getChannel(username);
}

async function getChannel(username) {
    const tokenPayload = await getTwitchAccessToken()
    const response = await Axios.get(`https://api.twitch.tv/helix/search/channels?query=${username}`, {
        headers: {
            "Authorization": `Bearer ${tokenPayload.access_token}`,
            "Client-Id": process.env.TWITCH_CLIENT_ID
        }
    })
    const channels = response.data.data.map((result) => {
        return {
            username: result.display_name,
            id: result.id,
            profilePicture: result.thumbnail_url
        }
    })
    return channels
}

async function getTwitchAccessToken() {
    const response = await Axios.post(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`)
    return response.data;
}

router.post("/", requiresAuth(), async (req, res) => {
    res.json(await registerAccount(req.user, req.body.id));
})

router.post("/add", async (req, res) => {
    const user = await User.findOne({ _id: req.body.userId });
    res.json(await registerAccount(user, req.body.id))
})

async function registerAccount(user, twitchId) {
    const tokenPayload = await getTwitchAccessToken();
    user.twitchId = twitchId;
    await Promise.all([
        createPostForLiveStream(tokenPayload.access_token, twitchId, user.id),
        createPostForVideos(tokenPayload.access_token, twitchId, user.id),
        registerWebhooks(tokenPayload.access_token, twitchId, user.id)
    ]);
    return await user.save();
}

async function registerWebhooks(accessToken, twitchId, userId) {
    try {
        const leaseTime = 60 * 60 * 24 * 7;
        const now = new Date();
        const webhook = new Webhook({
            expirationDate: now.setSeconds(now.getSeconds() + leaseTime),
            platform: "twitch",
            topicURL: `https://api.twitch.tv/helix/streams?user_id=${twitchId}`,
            callbackURL: `${process.env.BASE_URL}/api/feed/twitch/callback?user_id=${userId}`,
            userId: userId
        });
        await Axios.post("https://api.twitch.tv/helix/webhooks/hub", {
            "hub.callback": `${process.env.BASE_URL}/api/feed/twitch/callback?user_id=${userId}`,
            "hub.mode": "subscribe",
            "hub.lease_seconds": leaseTime,
            "hub.topic": `https://api.twitch.tv/helix/streams?user_id=${twitchId}`
        }, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Client-Id": process.env.TWITCH_CLIENT_ID
            }
        });
        await webhook.save();
    } catch (error) {
        console.log(error.response.data);
    }
}

async function createPostForLiveStream(accessToken, twitchId, userId) {
    try {
        const userLiveStreams = await getLiveStream(accessToken, twitchId);
        if (userLiveStreams.length === 1) {
            const twitchLiveStreamPost = new Post({
                type: "TWITCH_STREAM",
                userId: userId,
                timeCreated: new Date(userLiveStreams[0].started_at),
                twitchStream: {
                    url: `https://www.twitch.tv/${userLiveStreams[0].user_name}`,
                    live: true,
                    streamId: userLiveStreams[0].id,
                    gameName: await getGameName(accessToken, userLiveStreams[0].game_id),
                    startedAt: new Date(userLiveStreams[0].started_at),
                    title: userLiveStreams[0].title,
                    thumbnailUrl: userLiveStreams[0].thumbnail_url,
                    userName: userLiveStreams[0].user_name,
                }
            })
            await twitchLiveStreamPost.save();
        }
    } catch (error) {
        console.log(error);
    }
}

async function getGameName(accessToken, gameId) {
    const response = await Axios.get(`https://api.twitch.tv/helix/games?id=${gameId}`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Client-Id": process.env.TWITCH_CLIENT_ID
        }
    })
    if (response.data.data.length === 0) {
        return "";
    }
    return response.data.data[0].name;
}

async function getLiveStream(accessToken, twitchId) {
    const response = await Axios.get(`https://api.twitch.tv/helix/streams?user_id=${twitchId}`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Client-Id": process.env.TWITCH_CLIENT_ID
        }
    })
    return response.data.data;
}

async function createPostForVideos(accessToken, twitchId, userId) {
    let videoPageResponse = await getVideoPage(accessToken, twitchId);
    while (videoPageResponse.data.data.length !== 0) {
        if (videoPageResponse.headers["ratelimit-remaining"] <= 20) {
            const waitTime = parseInt(videoPageResponse.headers["ratelimit-reset"]) - (new Date().getTime() / 1000);
            await wait(waitTime * 1000);
        }
        await Promise.all(videoPageResponse.data.data.map(video => {
            createVideoPost(video, accessToken, userId)
        }));
        videoPageResponse = await getVideoPage(accessToken, twitchId, videoPageResponse.data.pagination.cursor);
    }
}

async function wait(miliseconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, miliseconds)
    })
}

async function getVideoPage(accessToken, twitchId, paginationCursor) {
    if (!paginationCursor) {
        const response = await Axios.get(`https://api.twitch.tv/helix/videos?user_id=${twitchId}`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Client-Id": process.env.TWITCH_CLIENT_ID
            }
        })
        return response;
    }
    const response = await Axios.get(`https://api.twitch.tv/helix/videos?user_id=${twitchId}&after=${paginationCursor}`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Client-Id": process.env.TWITCH_CLIENT_ID
        }
        
    })
    return response;
}

async function createVideoPost(video, accessToken, userId) {
    const videoPost = new Post({
        type: "TWITCH_VIDEO",
        userId: userId,
        timeCreated: new Date(video.created_at),
        twitchVideo: {
            url: video.url,
            gameName: await getGameName(accessToken, video.game_id),
            publishedAt: new Date(video.published_at),
            title: video.title,
            description: video.description,
            thumbnailUrl: video.thumbnail_url,
            userName: video.user_name,
        }
    })
    return await videoPost.save()
}

module.exports = router;