const multer = require("multer");
const path = require("path");

const { HttpError } = require("../helpers");

const multerConfig = multer.diskStorage({
    destination: path.join(__dirname, "../", "temp"),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

// config multer filter
const multerFilter = (req, file, cb) => {
    
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(HttpError(400, 'Please, upload images only!!'), false);
  }
};

// create multer middleware
const upload = multer({
    fileFilter: multerFilter,
    storage: multerConfig,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
}).single('avatar');

module.exports = upload;