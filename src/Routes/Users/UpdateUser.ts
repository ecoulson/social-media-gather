import requiresAuth from "../../Middleware/RequiresAuth";
import { Router } from "express";

const router = Router();

router.put("/", requiresAuth(), async (req, res) => {
    (req as any).user.email = req.body.email;
    await (req as any).user.save();
    res.send("updated");
})

export default router;