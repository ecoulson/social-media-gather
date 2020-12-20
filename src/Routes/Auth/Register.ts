import router from "express";
import bcrypt from "bcrypt";
import User from "../../Models/User";

router.post("/", async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const results = await User.find({
        $or: [
            { email: req.body.email }, 
            { username: req.body.username }
        ]
    }).exec();
    if (results.length > 0) {
        return res.json({
            error: "Username or email is already taken"
        })
    }
    const user = new User({
        password: hashedPassword,
        email: req.body.email,
        username: req.body.username
    });
    user.following = [user.id]
    await user.save();
    const serializedUser = user.toJSON();
    delete serializedUser.password;
    return res.json(serializedUser);
})

export default router;