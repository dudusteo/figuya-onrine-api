const { authJwt } = require("../middleware");
const controller = require("../controllers/utils.controller");

module.exports = (app) => {
	app.use((req, res, next) => {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	app.get(
		"/api/utils/autoincrement/get",
		[authJwt.verifyToken, authJwt.isAdmin],
		controller.getNextAutoIncrementId
	);
};
