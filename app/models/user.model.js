module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define("user", {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		first_name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		last_name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	});

	return User;
};
