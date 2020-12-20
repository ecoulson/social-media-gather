import router from "express";
import bcrypt from "bcrypt";
import User from "../../Models/User";
import jsonwebtoken from "jsonwebtoken";

router.post("/", async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
        return res.json({
            error: "No user with the provided username"
        })
    }
    if (await bcrypt.compare(req.body.password, user.password)) {
        const options = {};
        if (!req.body.rememberMe) {
            options["expiresIn"] = "1d"
        }
        const token = jsonwebtoken.sign({ id: user.id }, process.env.AUTH_SECRET, options)
        return res.json({
            token,
            expiresIn: options.expiresIn
        })
    } else {
        return res.json({
            error: "Passwords do not match"
        })
    }
})

export default router;