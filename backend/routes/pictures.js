const express = require("express")
const router = express.Router();

const upload = require("../config/multer")
const pictures_controllers = require("../controllers/pictures_controllers");

router.post('/post',upload.single("myFile"),pictures_controllers.postPicture);
router.get('/get',pictures_controllers.getPicture);

module.exports = router;