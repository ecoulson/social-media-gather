const router = require("express").Router();
const Users = require("../../Models/User");

router.get("/", async (req, res) => {
    const users = await Users.find();
    const randomIndex = Math.floor(Math.random() * users.length);
    res.json({
        username: users[randomIndex].username
    })
})

module.exports = router;