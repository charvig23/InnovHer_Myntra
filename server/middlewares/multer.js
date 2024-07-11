const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const singleUpload = upload.fields([
    { name: 'uploaded_images', maxCount: 1 },
    { name: 'other_images', maxCount: 1 }
  ]);

module.exports = singleUpload;