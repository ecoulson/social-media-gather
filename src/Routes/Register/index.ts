import { Router } from "express";
import YouTubeRoute from "./RegisterYouTubeAccount";
import AccountRoute from "./RegisterAccount";

const router = Router();

router.use("/", AccountRoute);
router.use("/youtube", YouTubeRoute);

export default router;
