const router = require("express").Router();
const User = require("../../Models/User");

router.post("/", async (req, res) => {
    res.json(await createUser(req.body))
});

async function createUser(body) {
    const user = new User({ 
        email: body.email,
        username: body.username,
    });
    user.following.push(user.id);
    await user.save();
    return user;
}

module.exports = router;