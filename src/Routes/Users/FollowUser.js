const requiresAuth = require("../../Middleware/RequiresAuth");
const router = require("express").Router();
const User = require("../../Models/User");

router.post("/:username", requiresAuth(), async (req, res) => {
    const userToFollow = await User.findOne({
        username: req.params.username
    });
    req.user.following.push(userToFollow.id)
    await req.user.save();
    res.send({ message: "followed!" })
})

module.exports = router;