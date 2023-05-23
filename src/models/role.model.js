module.exports = (sequelize, Sequelize) => {
	const Role = sequelize.define("role", {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			allowNull: false,
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	});

	return Role;
};
