const express = require("express");
const router = express.Router();

router.use("/client", require("./client"));
router.use("/freelancer", require("./freelancers"));
router.use("/ads", require("./ads"));

module.exports = router;
