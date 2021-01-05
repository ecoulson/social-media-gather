import { Router } from "express";
import YouTubeRoute from "./RegisterYouTubeAccount";
import TwitchAccount from "./RegisterTwitchAccount";
import AccountRoute from "./RegisterAccount";

const router = Router();

router.use("/", AccountRoute);
router.use("/youtube", YouTubeRoute);
router.use("/twitch", TwitchAccount);

export default router;
