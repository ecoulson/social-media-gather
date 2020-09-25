const router = require("express").Router();
const User = require('../../Models/User');
const TwitterSearchEndpoint = "https://api.twitter.com/1.1/users/lookup.json";
const Axios = require("axios").default;

router.get("/", async (req, res) => {
    res.json(await getTwitterUsers(req.query.username));
});

async function getTwitterUsers(userHandle) {
    const response = await Axios.get(`${TwitterSearchEndpoint}?screen_name=${userHandle}`, {
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
    return await user.save();
}

module.exports = router;