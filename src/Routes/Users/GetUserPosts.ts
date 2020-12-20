const router = require("express").Router();
const User = require("../../Models/User");
const Post = require("../../Models/Post");

router.get("/:username", async (req, res) => {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ 
        userId: user.id
    }).skip(parseInt(req.query.offset)).limit(20).sort({ timeCreated: -1 });
    res.json(posts);
})

export default router;