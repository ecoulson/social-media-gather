const router = require("express").Router();
const requiresAuth = require("../../Middleware/RequiresAuth");
const User = require("../../Models/User");

router.get("/:username", requiresAuth(), async (req, res) => {
    const users = await User.find({
        username: {
            $regex: new RegExp(`${req.params.username}.*`, 'i')
        }
    });
    return res.json(users.map((user) => {
        return {
            username: user.username,
            id: user.id,
            following: req.user.following.includes(user.id)
        }
    }));
})

module.exports = router;