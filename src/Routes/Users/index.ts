import { Router } from "express";
import GetUserPosts from "./GetUserPosts";

const router = Router();

router.use("/get-user-posts", GetUserPosts);

export default router;
