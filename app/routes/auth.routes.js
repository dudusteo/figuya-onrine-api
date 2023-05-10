const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const formDataMiddleware = require("../middleware/formData");

module.exports = (app) => {
	app.use((req, res, next) => {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	app.post(
		"/api/auth/signup",
		[
			formDataMiddleware,
			verifySignUp.checkDuplicateUsernameOrEmail,
			verifySignUp.checkRolesExisted,
		],
		controller.signup
	);

	app.post("/api/auth/signin", [formDataMiddleware], controller.signin);
};
