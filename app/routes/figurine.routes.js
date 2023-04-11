const controller = require("../controllers/figurine.controller");
const { authJwt } = require("../middleware");
const uploadFileMiddleware = require("../middleware/upload");

module.exports = (app) => {
	app.use((req, res, next) => {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	app.post(
		"/api/photos",
		[authJwt.verifyToken, authJwt.isAdmin, uploadFileMiddleware],
		controller.upload
	);

	app.post("/api/files", controller.getListFiles);

	app.post("/api/files/:name", controller.download);
};
