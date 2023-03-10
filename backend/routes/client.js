const express = require('express');
const router = express.Router();
const clientController = require("../controllers/client_controller");

router.post("/sign-up", clientController.signUp);
router.get("/yes", clientController.yes);

module.exports = router;