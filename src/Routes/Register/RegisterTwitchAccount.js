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
        createUserTwitchPosts(tokenPayload.access_token, twitchId),
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

async function createUserTwitchPosts(accessToken, twitchId) {
    try {
        const userLiveStreams = await getLiveStream(accessToken, twitchId);
        if (userLiveStreams.length === 1) {
            const twitchLiveStreamPost = new Post({
                type: "TWITCH_STREAM",
                userId: userLiveStreams[0].user_id,
                createdAt: new Date(userLiveStreams[0].started_at),
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

module.exports = router;