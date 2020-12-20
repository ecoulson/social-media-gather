import requiresAuth from "../../Middleware/RequiresAuth";
import router from "express";
import User from "../../Models/User";

router.post("/:username", requiresAuth(), async (req, res) => {
    const userToFollow = await User.findOne({
        username: req.params.username
    });
    req.user.following.push(userToFollow.id)
    await req.user.save();
    res.send({ message: "followed!" })
})

export default router;