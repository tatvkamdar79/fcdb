const express = require("express");
const router = express.Router();
const clientController = require("../controllers/client_controller");

router.post("/signup", clientController.signUp);
router.post("/signin", clientController.signIn);
router.get("/getActiveAds", clientController.getActiveAds);
router.get("/getPreviousAds", clientController.getPreviousAds);
router.get("/getClient/:clientId", clientController.getClient);
// router.post("/createGmeet", clientController.createGmeet);

module.exports = router;
