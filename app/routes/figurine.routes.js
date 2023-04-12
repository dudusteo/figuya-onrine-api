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
		"/api/figurine/add",
		[authJwt.verifyToken, authJwt.isAdmin, uploadFileMiddleware],
		controller.addFigurine
	);
};
