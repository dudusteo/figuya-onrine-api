const jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require("../../models");

const User = db.users;

const login = (req, res) => {
	const { email, password } = req.body;

	User.findOne({ where: { email: email, password: password } })
		.then((user) => {
			if (user === null) {
				console.log("User: Not found!");
			} else {
				console.log("User: " + user);
				let jwtSecretKey = process.env.JWT_SECRET_KEY;

				const token = jwt.sign({ email }, jwtSecretKey, {
					expiresIn: "7d",
				});

				res.send({ email, token });
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message,
			});
		});
};

const register = (req, res) => {
	const { email, password, firstName, lastName } = req.body;

	const user = {
		email: email,
		password: password,
		first_name: firstName,
		last_name: lastName,
	};

	User.create(user)
		.then((data) => {
			console.log(data);
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message,
			});
		});
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
