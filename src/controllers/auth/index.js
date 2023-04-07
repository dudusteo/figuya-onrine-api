const jwt = require("jsonwebtoken");
require("dotenv").config();

const db = [
	{
		email: "admin",
		password: "admin",
		firstName: "admin",
		lastName: "admin",
	},
];

const login = (req, res) => {
	const { email, password } = req.body;

	db.forEach((element) => {
		if (element.email === email && element.password === password)
			console.log("logged in");
	});

	let jwtSecretKey = process.env.JWT_SECRET_KEY;

	const token = jwt.sign({ email }, jwtSecretKey, { expiresIn: "7d" });

	res.send({ email, token });
};

const register = (req, res) => {
	// Create User here

	const { email, password, firstName, lastName } = req.body;

	db.push({ email, password, firstName, lastName });

	console.log(db);
};

const validateToken = (req, res) => {
	// Tokens are generally passed in header of request
	// Due to security reasons.

	let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
	let jwtSecretKey = process.env.JWT_SECRET_KEY;

	try {
		const token = req.header(tokenHeaderKey);

		const verified = jwt.verify(token, jwtSecretKey);
		if (verified) {
			return res.send("Successfully Verified");
		} else {
			// Access Denied
			return res.status(401).send(error);
		}
	} catch (error) {
		// Access Denied
		return res.status(401).send(error);
	}
};

module.exports = {
	login,
	register,
	validateToken,
};
