const util = require("util");
const multer = require("multer");

const formData = multer().any();

let formDataMiddleware = util.promisify(formData);
module.exports = formDataMiddleware;
