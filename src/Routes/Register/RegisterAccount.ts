import { Router } from "express";
import User from "../../Schemas/Mongo/User/UserModel";

const router = Router();

router.post("/", async (req, res) => {
    res.json(await createUser(req.body));
});

async function createUser(body: { email: string; username: string }) {
    const user = new User({
        email: body.email,
        username: body.username
    });
    user.following.push(user.id);
    await user.save();
    return user;
}

export default router;
