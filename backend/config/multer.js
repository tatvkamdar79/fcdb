const multer = require("multer");

// const upload = multer({ dest: "upload/" }).single("file");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log("Hello before upload");
    // console.log(req.file);
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    let f = file.originalname.split(".");
    let newFileName = f[0] + 5 + "." + f[1];
    cb(null, newFileName);
  },
});
const upload = multer({ storage: storage }).single("myfile");

module.exports = upload;
