const router = require("express").Router();
const User = require("../../Models/User");

router.post("/", async (req, res) => {
    res.json(await createUser(req.body.email))
});

async function createUser(email) {
    const user = new User({ email });
    return await user.save();
}

module.exports = router;