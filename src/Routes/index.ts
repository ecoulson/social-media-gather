import { Router } from "express";
import RegisterRouter from "./Register";
import FeedRouter from "./Feed";

const router = Router();

router.use("/register", RegisterRouter);
router.use("/feed", FeedRouter);

export default router;
