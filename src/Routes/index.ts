import { Router } from "express";
import RegisterRouter from "./Register";
import FeedRouter from "./Feed";
import AuthRouter from "./Auth";
import UsersRouter from "./Users";
import SearchRouter from "./Search";

const router = Router();

router.use("/auth", AuthRouter);
router.use("/register", RegisterRouter);
router.use("/feed", FeedRouter);
router.use("/users", UsersRouter);
router.use("/search", SearchRouter);

export default router;
