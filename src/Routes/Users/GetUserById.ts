const router = require("express").Router();
const User = require("../../Models/User");

router.get("/:id", async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
})

export default router;