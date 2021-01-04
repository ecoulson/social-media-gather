import { Router } from "express";
import RegisterRouter from "./Register";

const router = Router();

router.use("/register", RegisterRouter);

export default router;
