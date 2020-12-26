import { Router } from "express";
import RegistrationRouter from "./Register";
import LoginRouter from "./Login";
import IsAuthenticatedRouter from "./IsAuthenticated";
import MeRouter from "./Me";
import DeleteRouter from "./Delete";
import VerifyRouter from "./Verify";

const router = Router();

router.use("/register", RegistrationRouter);
router.use("/login", LoginRouter);
router.use("/is-authenticated", IsAuthenticatedRouter);
router.use("/me", MeRouter);
router.use("/verify", VerifyRouter);
router.use("/delete", DeleteRouter);

export default router;
