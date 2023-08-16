import util from "util";
import multer from "multer";

const maxSize = 2 * 1024 * 1024;

console.log(process.env.STATIC_DIR + "/static");

let storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, process.env.STATIC_DIR + "/static");
	},
	filename: (req, file, cb) => {
		console.log(file.originalname);
		cb(null, file.originalname);
	},
});

let uploadFile = multer({
	storage: storage,
	limits: { fileSize: maxSize },
}).array("images");

let uploadFileMiddleware = util.promisify(uploadFile);

export default { uploadFileMiddleware };
