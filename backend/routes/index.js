const express = require("express");
const router = express.Router();

router.use("/client", require("./client"));

module.exports = router;
