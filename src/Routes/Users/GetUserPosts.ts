import { Router } from "express";
import User from "../../DataStore/Mongo/Models/User/UserModel";
import Post from "../../DataStore/Mongo/Models/Post/PostModel";

const router = Router();

router.get("/:username", async (req, res) => {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ 
        userId: user.id
    }).skip(parseInt(req.query.offset as string)).limit(20).sort({ timeCreated: -1 });
    res.json(posts);
})

export default router;