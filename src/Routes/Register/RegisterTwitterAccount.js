const router = require("express").Router();
const User = require('../../Models/User');
const TwitterSearchEndpoint = "https://api.twitter.com/1.1/users/lookup.json";
const Axios = require("axios").default;

router.get("/:userHandle", async (req, res) => {
    res.json(await getTwitterUsers(req.params.userHandle));
});

async function getTwitterUsers(userHandle) {
    const response = await Axios.get(`${TwitterSearchEndpoint}?screen_name=${userHandle}`, {
        headers: {
            "Authorization": `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
        }
    });
    return response.data;
}

router.post("/:id", async (req, res) => {
    res.json(await registerAccount(req.params.id, req.body.twitterId));
})

async function registerAccount(userId, twitterId) {
    const user = await User.findById(userId);
    user.twitterId = twitterId;
    return await user.save();
}

module.exports = router;