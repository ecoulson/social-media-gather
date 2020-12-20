const router = require("express").Router();
const User = require("../../Models/User");

router.get("/", async (req, res) => {
    const user = await User.findOne({ 
        email: req.query.email,
        username: req.query.username
    });
    user.verified = true;
    await user.save();
    const serializedUser = user.toJSON();
    delete serializedUser.password
    return res.json(user)
})

export default router;