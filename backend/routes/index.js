const express = require("express");
const router = express.Router();

router.use("/client", require("./client"));
router.use("/freelancer", require("./freelancers"));
router.use("/ads", require("./ads"));
router.use("/conversations", require("./conversations"));
router.get("/getUserDetails", require("../controllers/getUserDetails"));
router.use('/pictures',require("./pictures"));

module.exports = router;
