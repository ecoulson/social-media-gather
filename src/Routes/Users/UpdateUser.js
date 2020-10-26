const requiresAuth = require("../../Middleware/RequiresAuth");
const router = require("express").Router();

router.put("/", requiresAuth(), async (req, res) => {
    req.user.email = req.body.email;
    await req.user.save();
    res.send("updated");
})

module.exports = router;