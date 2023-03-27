const express = require("express");
const router = express.Router();
const conversationController = require("../controllers/conversationControllers");

router.post("/createMessage", conversationController.createMessage);

module.exports = router;
