const router = require("express").Router();
const Post = require('../../Models/Post');

router.get("/", async (req, res) => {
    const feed = await Post.find().sort({ timeCreated: -1 }).exec()
    return res.json(feed);
})

module.exports = router;