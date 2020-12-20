import requiresAuth from "../../Middleware/RequiresAuth";
import router from "express";

router.put("/", requiresAuth(), async (req, res) => {
    req.user.email = req.body.email;
    await req.user.save();
    res.send("updated");
})

export default router;