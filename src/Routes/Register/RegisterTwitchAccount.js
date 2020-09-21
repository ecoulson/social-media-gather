const router = require("express").Router();
const User = require('../../Models/User');
const Axios = require("axios").default

router.get("/:username", async (req, res) => {
    res.json(await getUsers(req.params.username))
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
    return response.data
}

async function getTwitchAccessToken() {
    const response = await Axios.post(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`)
    console.log(response.data)
    return response.data;
}

router.post("/:id", async (req, res) => {
    res.json(await registerAccount(req.params.id, req.body.twitchId));
})

async function registerAccount(userId, twitchId) {
    const user = await User.findById(userId);
    user.twitchId = twitchId;
    return await user.save();
}

module.exports = router;