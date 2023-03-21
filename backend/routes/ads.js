const express = require("express");
const router = express.Router();
const adsControllers = require("../controllers/ads_controllers");

// router.post("/signup", adsControllers.signUp);
router.get("/category/:categoryName", adsControllers.getAdsOnCategoryName);
router.post("/create", adsControllers.createAd);

module.exports = router;
