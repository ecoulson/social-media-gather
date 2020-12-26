import { Router } from "express";
import requiresAuth from "../../Middleware/RequiresAuth";
import User from "../../DataStore/Mongo/Models/User/UserModel";
import IUserDocument from "../../DataStore/Mongo/Models/User/IUserDocument";

const router = Router();

router.get("/:followingUsername", requiresAuth(), async (req, res) => {
    return res.json({
        isFollowing: await isFollowing(req.user, req.params.followingUsername)
    });
});

async function isFollowing(user: IUserDocument, followingUsername: string) {
    const followingUser = await User.findOne({ username: followingUsername });
    return user.following.includes(followingUser.id);
}

export default router;
