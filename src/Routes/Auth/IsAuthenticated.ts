import { Router } from "express";
import jsonwebtoken from "jsonwebtoken";
import User from "../../Models/User";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const decoded = jsonwebtoken.verify(req.headers.authorization.split('Bearer ')[1], process.env.AUTH_SECRET) as any;
        const user = await User.findById(decoded.id);
        res.json({
            isAuthenticated: user !== null
        });
    } catch (error) {
        res.json({
            isAuthenticated: false
        })
    }
})

export default router;