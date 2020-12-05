const router = require("express").Router();
const TwitterRoute = require("./RegisterTwitterAccount");
const YouTubeRoute = require("./RegisterYouTubeAccount");
const TwitchAccount = require("./RegisterTwitchAccount");
const InstagramAccount = require("./RegisterInstagramAccount");
const AccountRoute = require("./RegisterAccount");

router.use("/", AccountRoute);
router.use("/twitter", TwitterRoute);
router.use("/youtube", YouTubeRoute);
router.use("/twitch", TwitchAccount);
router.use("/instagram", InstagramAccount);

module.exports = router;