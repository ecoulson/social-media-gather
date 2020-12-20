import { Router } from "express";
import Routes from "./Routes";

const router = Router();

router.use("/api", Routes);

export default router;