const router = require("express").Router();
const requiresAuth = require("../../Middleware/RequiresAuth");
const User = require("../../Models/User");

router.get('/:username', requiresAuth(), async (req, res) => {
    const user = await User.findOne({ 
        username: req.params.username
    })
    const serializedUser = user.toJSON();
    delete serializedUser.password;
    return res.json(serializedUser);
})

export default router;