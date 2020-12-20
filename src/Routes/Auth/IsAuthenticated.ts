const router = require("express").Router();
const jsonwebtoken = require("jsonwebtoken");
const User = require("../../Models/User");

router.get("/", async (req, res) => {
    try {
        const decoded = jsonwebtoken.verify(req.headers.authorization.split('Bearer ')[1], process.env.AUTH_SECRET)
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