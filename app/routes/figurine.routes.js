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

	app.get("/api/figurine/get", controller.getFigurines);

	app.post(
		"/api/figurine/option/character/add",
		controller.addCharacterOption
	);

	app.post("/api/figurine/option/origin/add", controller.addOriginOption);

	app.post("/api/figurine/option/company/add", controller.addCompanyOption);

	app.post("/api/figurine/option/type/add", controller.addTypeOption);

	app.get("/api/figurine/option/get", controller.getOptions);
};
