import { Router } from "express";
import User from "../../Models/User";

const router = Router();

router.get("/", async (req, res) => {
    const user = await User.findOne({ 
        email: req.query.email,
        username: req.query.username
    }) as any;
    user.verified = true;
    await user.save();
    const serializedUser = user.toJSON();
    delete serializedUser.password
    return res.json(user)
})

export default router;