import { Router } from "express";
import Users from "../../Models/User";

const router = Router();

router.get("/", async (req, res) => {
    const users = await Users.find() as any;
    const randomIndex = Math.floor(Math.random() * users.length);
    res.json({
        username: users[randomIndex].username
    })
})

export default router;