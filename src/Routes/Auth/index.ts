const router = require("express").Router();
const RegistrationRouter = require("./Register");
const LoginRouter = require("./Login");
const IsAuthenticatedRouter = require("./IsAuthenticated");
const MeRouter = require("./Me");
const DeleteRouter = require("./Delete");
const VerifyRouter = require("./Verify");

router.use("/register", RegistrationRouter);
router.use("/login", LoginRouter);
router.use("/is-authenticated", IsAuthenticatedRouter);
router.use("/me", MeRouter);
router.use("/verify", VerifyRouter);
router.use("/delete", DeleteRouter);

export default router;