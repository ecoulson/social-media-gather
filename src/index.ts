const router = require("express").Router();
const Routes = require("./Routes");

router.use("/api", Routes);

module.exports = router;