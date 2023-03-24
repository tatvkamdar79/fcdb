const express = require("express");
const router = express.Router();
const adsControllers = require("../controllers/adsControllers");

// router.post("/signup", adsControllers.signUp);
router.get("/category/:categoryName", adsControllers.getAdsOnCategoryName);
router.post("/create", adsControllers.createAd);
router.post("/buy/:adId", adsControllers.buyAd);

module.exports = router;
