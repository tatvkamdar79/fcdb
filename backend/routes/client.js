const express = require("express");
const router = express.Router();
const clientController = require("../controllers/client_controller");

router.post("/signup", clientController.signUp);
router.post("/signin", clientController.signIn);
router.get("/getActiveAds", clientController.getActiveAds);
router.get("/getPreviousAds", clientController.getPreviousAds);
router.post("/createGmeet", clientController.createGmeet);
router.post("/bookmarkAd", clientController.bookMarkAd);
router.get("/getBookmarkedAd",clientController.getBookMarkedAds);
router.get("/removeBookmarkedAd",clientController.removeBookMark);

module.exports = router;
