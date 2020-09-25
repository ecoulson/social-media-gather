const router = require("express").Router();
const User = require('../../Models/User');
const Post = require('../../Models/Post');
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

router.post("/:id", async (req, res) => {
    res.json(await registerAccount(req.params.id, req.body.id));
})

async function registerAccount(userId, twitchId) {
    const user = await User.findById(userId);
    const tokenPayload = await getTwitchAccessToken();
    user.twitchId = twitchId;
    await Promise.all([
        createPostForLiveStream(tokenPayload.access_token, twitchId),
        createPostForVideos(tokenPayload.access_token, twitchId),
        registerWebhooks(tokenPayload.access_token, twitchId)
    ]);
    return await user.save();
}

async function registerWebhooks(accessToken, twitchId) {
    try {
        await Axios.post("https://api.twitch.tv/helix/webhooks/hub", {
            "hub.callback": `${process.env.BASE_URL}/api/feed/twitch/callback?twitch_id=${twitchId}`,
            "hub.mode": "subscribe",
            "hub.lease_seconds": 864000,
            "hub.secret": "bob",
            "hub.topic": `https://api.twitch.tv/helix/streams?user_id=${twitchId}`
        }, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Client-Id": process.env.TWITCH_CLIENT_ID
            }
        })
    } catch (error) {
        console.log(error.response.data);
    }
}

async function createPostForLiveStream(accessToken, twitchId) {
    try {
        const userLiveStreams = await getLiveStream(accessToken, twitchId);
        if (userLiveStreams.length === 1) {
            const twitchLiveStreamPost = new Post({
                type: "TWITCH_STREAM",
                userId: userLiveStreams[0].user_id,
                timeCreated: new Date(userLiveStreams[0].started_at),
                twitchStream: {
                    url: `https://www.twitch.tv/${userLiveStreams[0].user_name}`,
                    live: true,
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

async function getLiveStream(accessToken, userId) {
    const response = await Axios.get(`https://api.twitch.tv/helix/streams?user_id=${userId}`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Client-Id": process.env.TWITCH_CLIENT_ID
        }
    })
    return response.data.data;
}

async function createPostForVideos(accessToken, userId) {
    let videoPageResponse = await getVideoPage(accessToken, userId);
    while (videoPageResponse.data.data.length !== 0) {
        if (videoPageResponse.headers["ratelimit-remaining"] <= 20) {
            const waitTime = parseInt(videoPageResponse.headers["ratelimit-reset"]) - (new Date().getTime() / 1000);
            await wait(waitTime * 1000);
        }
        await Promise.all(videoPageResponse.data.data.map(video => {
            createVideoPost(video, accessToken)
        }));
        videoPageResponse = await getVideoPage(accessToken, userId, videoPageResponse.data.pagination.cursor);
    }
}

async function wait(miliseconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, miliseconds)
    })
}

async function getVideoPage(accessToken, userId, paginationCursor) {
    if (!paginationCursor) {
        const response = await Axios.get(`https://api.twitch.tv/helix/videos?user_id=${userId}`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Client-Id": process.env.TWITCH_CLIENT_ID
            }
        })
        return response;
    }
    const response = await Axios.get(`https://api.twitch.tv/helix/videos?user_id=${userId}&after=${paginationCursor}`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Client-Id": process.env.TWITCH_CLIENT_ID
        }
        
    })
    return response;
}

async function createVideoPost(video, accessToken) {
    const videoPost = new Post({
        type: "TWITCH_VIDEO",
        userId: video.user_id,
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