import requiresAuth from "../../Middleware/RequiresAuth";
import { Router } from "express";
import User from "../../Models/User";

const router = Router();

router.post("/:username", requiresAuth(), async (req, res) => {
    const userToFollow = await User.findOne({
        username: req.params.username
    });
    req.user.following.push(userToFollow.id)
    await req.user.save();
    res.send({ message: "followed!" })
})

export default router;