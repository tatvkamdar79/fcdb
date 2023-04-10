const express = require("express");
const router = express.Router();
const upload = require("../config/multer");

const adsControllers = require("../controllers/adsControllers");

router.get("/category/:categoryName", adsControllers.getAdsOnCategoryName);
router.post("/endAdContract", adsControllers.endAdContract);
router.post("/create", upload.single("myFile"), adsControllers.createAd);
router.post("/delete/:adId", adsControllers.deleteAd);
router.post("/update/:adId", adsControllers.updateAd);
router.post("/buyAd", adsControllers.confirmAd);
// router.post("/orderComplete/")
router.get("/clientsOnAd/:adId", adsControllers.getClientsOnAd);
router.get("/:adId", adsControllers.getAd);

module.exports = router;
