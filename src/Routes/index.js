const router = require("express").Router();
const RegisterRouter = require("./Register");

router.use("/register", RegisterRouter);

module.exports = router;