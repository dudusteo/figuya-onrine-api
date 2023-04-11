const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
const __basedir = "";

let storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, __basedir + "./resources/static/assets/uploads/");
	},
	filename: (req, file, cb) => {
		console.log(file.originalname);
		cb(null, file.originalname);
	},
});

let uploadFile = multer({
	storage: storage,
	limits: { fileSize: maxSize },
}).single("image");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
