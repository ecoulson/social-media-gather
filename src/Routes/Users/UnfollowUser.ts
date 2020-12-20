import requiresAuth from "../../Middleware/RequiresAuth";
import { Router } from "express";
import User from "../../Models/User";

const router = Router();

router.post("/:username", requiresAuth(), async (req, res) => {
    const userToFollow = await User.findOne({
        username: req.params.username
    });
    req.user.following.splice(req.user.following.indexOf(userToFollow.id), 1);
    await req.user.save();
    res.send({ message: "followed!" })
})

export default router;