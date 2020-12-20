import { Router } from "express";
import requiresAuth from "../../Middleware/RequiresAuth";
import User from "../../Models/User";

const router = Router();

router.get("/:followingUsername", requiresAuth(), async (req, res) => {
    return res.json({
        isFollowing: await isFollowing(req.user, req.params.followingUsername)
    });
});

async function isFollowing(user : any, followingUsername : string) {
    const followingUser = await User.findOne({ username: followingUsername});
    return user.following.includes(followingUser.id);
}

export default router;