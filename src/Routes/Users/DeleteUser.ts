import requiresAuth from "../../Middleware/RequiresAuth";
import router from "express";
import User from "../../Models/User";

router.delete("/", requiresAuth(), async (req, res) => {
    await User.findByIdAndDelete(req.user.id);
    res.send("deleted");
});

export default router;