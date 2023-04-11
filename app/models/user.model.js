module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define(
		"user",
		{
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			email: {
				type: Sequelize.STRING,
			},
			password: {
				type: Sequelize.STRING,
			},
			first_name: {
				type: Sequelize.STRING,
			},
			last_name: {
				type: Sequelize.STRING,
			},
		},
		{
			timestamps: false,
		}
	);

	return User;
};
