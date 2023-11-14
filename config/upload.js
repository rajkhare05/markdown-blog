const multer = require('multer');

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + "." + file.mimetype.slice(6))
    }
});

const upload = multer({ storage: diskStorage });

module.exports = upload;

