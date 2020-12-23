import { Router } from "express";
import requiresAuth from "../../Middleware/RequiresAuth";
import User from "../../DataStore/Mongo/Models/User/UserModel";

const router = Router();

router.get('/:username', requiresAuth(), async (req, res) => {
    const user = await User.findOne({ 
        username: req.params.username
    })
    const serializedUser = user.toJSON();
    delete serializedUser.password;
    return res.json(serializedUser);
})

export default router;