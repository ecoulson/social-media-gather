const router = require("express").Router();
const { google } = require("googleapis");
const User = require('../../Models/User');

router.get("/:username", async (req, res) => {
    res.json(await getUsers(req.params.username))
});

async function getUsers(username) {
    const service = google.youtube('v3');
    return await getChannel(username, service);
}

function getChannel(username, service) {
    return new Promise((resolve, reject) => {
        service.search.list({
            auth: process.env.YOUTUBE_API_KEY,
            part: 'snippet',
            q: username,
            type: "channel"
        }, function (err, response) {
            if (err) {
                return reject(err);
            }
            return resolve(response.data);
        })
    })
}

router.post("/:id", async (req, res) => {
    res.json(await registerAccount(req.params.id, req.body.channelId));
})

async function registerAccount(userId, channelId) {
    const user = await User.findById(userId);
    user.youtubeId = channelId;
    return await user.save();
}

module.exports = router;