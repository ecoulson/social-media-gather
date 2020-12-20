import router from "express";
import TwitterRoute from "./RegisterTwitterAccount";
import YouTubeRoute from "./RegisterYouTubeAccount";
import TwitchAccount from "./RegisterTwitchAccount";
import InstagramAccount from "./RegisterInstagramAccount";
import AccountRoute from "./RegisterAccount";

router.use("/", AccountRoute);
router.use("/twitter", TwitterRoute);
router.use("/youtube", YouTubeRoute);
router.use("/twitch", TwitchAccount);
router.use("/instagram", InstagramAccount);

export default router;