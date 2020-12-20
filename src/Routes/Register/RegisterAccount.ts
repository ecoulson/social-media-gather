import router from "express";
import User from "../../Models/User";

router.post("/", async (req, res) => {
    res.json(await createUser(req.body))
});

async function createUser(body) {
    const user = new User({ 
        email: body.email,
        username: body.username,
    });
    user.following.push(user.id);
    await user.save();
    return user;
}

export default router;