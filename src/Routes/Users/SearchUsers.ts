import { Router } from "express";
import requiresAuth from "../../Middleware/RequiresAuth";
import User from "../../Models/User";

const router = Router();

router.get("/:username", requiresAuth(), async (req, res) => {
    const users = await User.find({
        username: {
            $regex: new RegExp(`${req.params.username}.*`, 'i')
        }
    });
    return res.json(users.map((user : any) => {
        return {
            username: user.username,
            id: user.id,
            following: (req as any).user.following.includes(user.id),
            twitterId: user.twitterId,
            twitchId: user.twitchId,
            youtubeId: user.youtubeId,
            instagramId: user.instagramId
        }
    }));
})

export default router;