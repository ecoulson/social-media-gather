const router = require("express").Router();
const RegisterRouter = require("./Register");
const FeedRouter = require("./Feed");

router.use("/register", RegisterRouter);
router.use("/feed", FeedRouter);

module.exports = router;