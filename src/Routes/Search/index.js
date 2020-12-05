const router = require("express").Router();
const SearchPlaceholder = require("./SearchPlaceholder");

router.use("/placeholder", SearchPlaceholder);

module.exports = router;