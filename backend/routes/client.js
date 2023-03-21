const express = require("express");
const router = express.Router();
const clientController = require("../controllers/client_controller");

router.post("/signup", clientController.signUp);
router.get("/signin", clientController.signIn);

module.exports = router;
