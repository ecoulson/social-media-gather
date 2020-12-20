import { Router } from "express";
import User from "../../Models/User";

const router = Router();

router.post("/", async (req, res) => {
    res.json(await createUser(req.body))
});

async function createUser(body : any) {
    const user = new User({ 
        email: body.email,
        username: body.username,
    }) as any;
    user.following.push(user.id);
    await user.save();
    return user;
}

export default router;