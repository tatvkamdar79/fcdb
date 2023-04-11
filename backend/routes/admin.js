const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin_controllers");

router.get("/getAllUsers", adminController.getAllUsers);
router.post("/deleteClient", adminController.deleteClient);
router.post("/deleteFreelancer", adminController.deleteFreelancer);

module.exports = router;
