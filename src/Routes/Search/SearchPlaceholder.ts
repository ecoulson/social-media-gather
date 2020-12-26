import { Router } from "express";
import Users from "../../DataStore/Mongo/Models/User/UserModel";

const router = Router();

router.get("/", async (req, res) => {
    const users = await Users.find();
    const randomIndex = Math.floor(Math.random() * users.length);
    res.json({
        username: users[randomIndex].username
    });
});

export default router;
