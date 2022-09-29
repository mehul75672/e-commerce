const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg') {
        return cd(new Error("Supported image files are jpeg, jpg, and png"));
    }
    cb(null, './public/images');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  }
});

const upload = multer({ storage: storage });
module.exports = { upload };