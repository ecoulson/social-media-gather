import { Router } from "express";
import User from "../../DataStore/Mongo/Models/User/UserModel";

const router = Router();

router.get("/", async (req, res) => {
    const user = await User.findOne({ 
        email: req.query.email as string,
        username: req.query.username as string
    }) as any;
    user.verified = true;
    await user.save();
    const serializedUser = user.toJSON();
    delete serializedUser.password
    return res.json(user)
})

export default router;