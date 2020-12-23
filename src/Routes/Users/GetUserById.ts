import { Router } from "express";
import User from "../../DataStore/Mongo/Models/User/UserModel";

const router = Router();

router.get("/:id", async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
})

export default router;