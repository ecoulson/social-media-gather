const router = require("express").Router();
const requiresAuth = require("../../Middleware/RequiresAuth");
const User = require("../../Models/User");

router.get("/:followingUsername", requiresAuth(), async (req, res) => {
    return res.json({
        isFollowing: await isFollowing(req.user, req.params.followingUsername)
    });
});

async function isFollowing(user, followingUsername) {
    const followingUser = await User.findOne({ username: followingUsername});
    return user.following.includes(followingUser.id);
}

module.exports = router;