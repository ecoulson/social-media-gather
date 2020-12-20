import requiresAuth from "../../Middleware/RequiresAuth";
import { Router } from "express";

const router = Router();

router.put("/", requiresAuth(), async (req, res) => {
    req.user.email = req.body.email;
    await req.user.save();
    res.send("updated");
})

export default router;