import { Router } from "express";
import RegisterRouter from "./Register";
import FeedRouter from "./Feed";
import UsersRouter from "./Users";

const router = Router();

router.use("/register", RegisterRouter);
router.use("/feed", FeedRouter);
router.use("/users", UsersRouter);

export default router;
