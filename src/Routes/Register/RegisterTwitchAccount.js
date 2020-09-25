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
    user.twitchId = twitchId;
    await Promise.all([
        createUserTwitchPosts(twitchId),
        registerWebhooks(twitchId)
    ]);
    return await user.save();
}

async function registerWebhooks(twitchId) {
    
}

async function createUserTwitchPosts(twitchId) {
    const tokenPayload = await getTwitchAccessToken();
    const userLiveStreams = await getLiveStream(tokenPayload.access_token, twitchId);
    if (userLiveStreams.length === 1) {
        const twitchLiveStreamPost = new Post({
            type: "TWITCH_STREAM",
            createdAt: new Date(userLiveStreams[0].started_at),
            twitchStream: {
                url: `https://www.twitch.tv/${userLiveStreams[0].user_name}`,
                live: true,
                gameName: await getGameName(tokenPayload.access_token, userLiveStreams[0].game_id),
                startedAt: new Date(userLiveStreams[0].started_at),
                title: userLiveStreams[0].title,
                thumbnailUrl: userLiveStreams[0].thumbnail_url
            }
        })
        await twitchLiveStreamPost.save();
    }
}

async function getGameName(accessToken, gameId) {
    const response = await Axios.get(`https://api.twitch.tv/helix/games?id=${gameId}`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Client-Id": process.env.TWITCH_CLIENT_ID
        }
    })
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