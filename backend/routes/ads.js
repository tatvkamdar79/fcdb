const express = require("express");
const router = express.Router();
const adsControllers = require("../controllers/adsControllers");

router.get("/category/:categoryName", adsControllers.getAdsOnCategoryName);
router.post("/create", adsControllers.createAd);
router.post("/delete/:adId", adsControllers.deleteAd);
router.post("/update/:adId", adsControllers.updateAd);
router.post("/confirm", adsControllers.confirmAd);
// router.post("/orderComplete/")
router.get("/clientsOnAd/:adId", adsControllers.getClientsOnAd);
router.get("/:adId", adsControllers.getAd);

module.exports = router;
