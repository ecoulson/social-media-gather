import { Router } from "express";
import jsonwebtoken from "jsonwebtoken";
import User from "../../DataStore/Mongo/Models/User/UserModel";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const decoded = jsonwebtoken.verify(
            req.headers.authorization.split("Bearer ")[1],
            process.env.AUTH_SECRET
        ) as {
            id: string;
        };
        const user = await User.findById(decoded.id);
        res.json({
            isAuthenticated: user !== null
        });
    } catch (error) {
        res.json({
            isAuthenticated: false
        });
    }
});

export default router;
