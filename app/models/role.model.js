module.exports = (sequelize, Sequelize) => {
	const Role = sequelize.define(
		"role",
		{
			role_id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
			},
			name: {
				type: Sequelize.STRING,
			},
		},
		{
			timestamps: false,
		}
	);

	return Role;
};
