const express = require("express");
const router = express.Router();
const freelancerController = require("../controllers/freelancer_controllers");

router.post("/signup", freelancerController.signUp);
router.post("/signin", freelancerController.signIn);

module.exports = router;
