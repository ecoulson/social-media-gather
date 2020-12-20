const requiresAuth = require("../../Middleware/RequiresAuth");
const router = require("express").Router();
const User = require("../../Models/User");

router.delete("/", requiresAuth(), async (req, res) => {
    await User.findByIdAndDelete(req.user.id);
    res.send("deleted");
});

export default router;