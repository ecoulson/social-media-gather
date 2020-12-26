import requiresAuth from "../../Middleware/RequiresAuth";
import { Router } from "express";
import User from "../../DataStore/Mongo/Models/User/UserModel";

const router = Router();

router.delete("/", requiresAuth(), async (req, res) => {
    await User.findByIdAndDelete(req.user.id);
    res.send("deleted");
});

export default router;
