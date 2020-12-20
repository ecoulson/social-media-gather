import { Router } from "express";
import User from "../../Models/User";
import jsonwebtoken from "jsonwebtoken";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const decoded = jsonwebtoken.verify(req.headers.authorization.split('Bearer ')[1], process.env.AUTH_SECRET) as any;
        const user = await User.findById(decoded.id);
        const serializedUser = user.toJSON();
        delete serializedUser.password;
        return res.json(serializedUser);
    } catch (error) {
        return res.json({
            error: "invalid jwt"
        })
    }
})

export default router;