const multer = require("multer");

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, process.cwd()+ "/uploads");
  },
  filename: function (req, file, cb) {
    let f = file.originalname.split(".");
    let newFileName = f[0] + 5 + +Math.random() +"."+ f[1];
    req.uploadedFilePath =  newFileName;
    cb(null, newFileName);
  },
});

const imageFileFilter = (req, file, cb) =>{
  if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      req.fileValidationError = "File Type not supported";
      return cb(null,false, req.fileValidationError);
  }
  cb(null, true)
};


const upload = multer({ storage: storage , fileFilter: imageFileFilter});

module.exports = upload;
