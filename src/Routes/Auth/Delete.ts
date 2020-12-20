import router from "express";
import User from "../../Models/User";
import jsonwebtoken from "jsonwebtoken";

router.delete("/", async (req, res) => {
    try {
        const decoded = jsonwebtoken.verify(req.headers.authorization.split('Bearer ')[1], process.env.AUTH_SECRET)
        const user = await User.findByIdAndDelete(decoded.id);
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