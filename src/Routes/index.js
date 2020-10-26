const router = require("express").Router();
const RegisterRouter = require("./Register");
const FeedRouter = require("./Feed");
const AuthRouter = require("./Auth");
const UsersRouter = require("./Users");

router.use("/auth", AuthRouter);
router.use("/register", RegisterRouter);
router.use("/feed", FeedRouter);
router.use("/users", UsersRouter);

module.exports = router;