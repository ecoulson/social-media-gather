import requiresAuth from "../../Middleware/RequiresAuth";
import { Router } from "express";
import User from "../../Models/User";

const router = Router();

router.post("/:username", requiresAuth(), async (req, res) => {
    const userToFollow = await User.findOne({
        username: req.params.username
    });
    (req as any).user.following.splice((req as any).user.following.indexOf(userToFollow.id), 1);
    await (req as any).user.save();
    res.send({ message: "followed!" })
})

export default router;