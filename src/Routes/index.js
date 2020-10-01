const router = require("express").Router();
const RegisterRouter = require("./Register");
const FeedRouter = require("./Feed");
const AuthRouter = require("./Auth");

router.use("/auth", AuthRouter);
router.use("/register", RegisterRouter);
router.use("/feed", FeedRouter);

module.exports = router;