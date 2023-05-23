const controller = require("../controllers/figurine.controller");
const { authJwt } = require("../middlewares");
const formDataMiddleware = require("../middlewares/formData");
const uploadFileMiddleware = require("../middlewares/upload");

module.exports = (app) => {
	app.use((req, res, next) => {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	//Figurine

	app.post(
		"/api/figurine/add",
		[authJwt.verifyToken, authJwt.isAdmin, uploadFileMiddleware],
		controller.addFigurine
	);

	app.get("/api/figurine/get", controller.getFigurine);

	app.get("/api/figurine/all", controller.getAllFigurines);

	app.delete(
		"/api/figurine/remove",
		[authJwt.verifyToken, authJwt.isAdmin],
		controller.removeFigurine
	);

	// mixed

	app.get("/api/figurine/all/shipment/get", controller.getFigurinesByPackage);

	app.get("/api/figurine/option/get", controller.getOptions);

	// shipment

	app.post(
		"/api/shipment/add",
		[authJwt.verifyToken, authJwt.isAdmin, formDataMiddleware],
		controller.addPackage
	);

	app.get("/api/shipment/all", controller.getPackages);
};
