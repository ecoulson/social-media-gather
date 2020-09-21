const router = require("express").Router();
const TwitterRoute = require("./RegisterTwitterAccount");
const YouTubeRoute = require("./RegisterYouTubeAccount");
const TwitchAccount = require("./RegisterTwitchAccount");
const AccountRoute = require("./RegisterAccount");

router.use("/", AccountRoute);
router.use("/twitter", TwitterRoute);
router.use("/youtube", YouTubeRoute);
router.use("/twitch", TwitchAccount);

module.exports = router;