const router = require("express").Router();
const Post = require('../../Models/Post');
const Axios = require("axios").default;

router.get("/", async (req, res) => {
    const feed = await Post.find().sort({ timeCreated: -1 }).exec()
    return res.json(feed);
})

router.get("/twitch/callback", (req, res) => {
    res.type("text/plain").status(200).send(req.query["hub.challenge"]);
})

router.post("/twitch/callback", async (req, res) => {
    const userLiveStreams = req.body.data
    if (userLiveStreams.length === 1) {
        console.log("create");
        const tokePayload = await getTwitchAccessToken();
        const twitchLiveStreamPost = new Post({
            type: "TWITCH_STREAM",
            createdAt: new Date(userLiveStreams[0].started_at),
            userId: userLiveStreams[0].user_id,
            twitchStream: {
                url: `https://www.twitch.tv/${userLiveStreams[0].user_name}`,
                live: true,
                gameName: await getGameName(tokePayload.access_token, userLiveStreams[0].game_id),
                userName: userLiveStreams[0].user_name,
                startedAt: new Date(userLiveStreams[0].started_at),
                title: userLiveStreams[0].title,
                thumbnailUrl: userLiveStreams[0].thumbnail_url
            }
        })
        await twitchLiveStreamPost.save();
    } else {
        console.log('end')
        await Post.findOneAndUpdate({
            "twitchStream.live": true,
            userId: req.query.twitch_id
        }, {
            $set: {
                "twitchStream.live": false,
                "twitchStream.endedAt": new Date()
            }
        }).exec();
    }
    res.status(200).send();
})

async function getTwitchAccessToken() {
    const response = await Axios.post(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`)
    return response.data;
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

module.exports = router;