import router from "express";
import User from "../../Models/User";

router.get("/:id", async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
})

export default router;