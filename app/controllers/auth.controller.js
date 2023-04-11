const db = require("../models");
require("dotenv").config();
const User = db.users;
const Role = db.roles;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
	// Save User to Database
	User.create({
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 8),
		first_name: req.body.firstName,
		last_name: req.body.lastName,
	})
		.then((user) => {
			if (req.body.roles) {
				Role.findAll({
					where: {
						name: {
							[Op.or]: req.body.roles,
						},
					},
				}).then((roles) => {
					user.setRoles(roles).then(() => {
						res.send({
							message: "User was registered successfully!",
						});
					});
				});
			} else {
				// user role = 1
				user.setRoles([1]).then(() => {
					res.send({ message: "User was registered successfully!" });
				});
			}
		})
		.catch((err) => {
			res.status(500).send({ message: err.message });
		});
};

exports.signin = (req, res) => {
	User.findOne({
		where: {
			email: req.body.email,
		},
	})
		.then((user) => {
			if (!user) {
				return res.status(404).send({ message: "User Not found." });
			}

			var passwordIsValid = bcrypt.compareSync(
				req.body.password,
				user.password
			);

			if (!passwordIsValid) {
				return res.status(401).send({
					accessToken: null,
					message: "Invalid Password!",
				});
			}

			var token = jwt.sign(
				{ id: user.user_id },
				process.env.JWT_SECRET_KEY,
				{
					expiresIn: 86400, // 24 hours
				}
			);

			var authorities = [];
			user.getRoles().then((roles) => {
				for (let i = 0; i < roles.length; i++) {
					authorities.push("ROLE_" + roles[i].name.toUpperCase());
				}
				res.status(200).send({
					id: user.user_id,
					email: user.email,
					roles: authorities,
					accessToken: token,
				});
			});
		})
		.catch((err) => {
			res.status(500).send({ message: err.message });
		});
};
