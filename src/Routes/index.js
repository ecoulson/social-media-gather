const router = require("express").Router();
const RegisterRouter = require("./Register");
const FeedRouter = require("./Feed");
const AuthRouter = require("./Auth");
const UsersRouter = require("./Users");
const SearchRouter = require("./Search");

router.use("/auth", AuthRouter);
router.use("/register", RegisterRouter);
router.use("/feed", FeedRouter);
router.use("/users", UsersRouter);
router.use("/search", SearchRouter);

module.exports = router;