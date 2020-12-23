import { Router } from "express";
import User from "../../DataStore/Mongo/Models/User/UserModel";
import jsonwebtoken from "jsonwebtoken";

const router = Router();

router.delete("/", async (req, res) => {
    try {
        const decoded = jsonwebtoken.verify(req.headers.authorization.split('Bearer ')[1], process.env.AUTH_SECRET) as any;
        await User.findByIdAndDelete(decoded.id);
        res.json({
            message: "deleted"
        });
    } catch (error) {
        res.json({
            message: "failed to delete"
        })
    }
})

export default router;