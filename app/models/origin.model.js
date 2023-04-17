module.exports = (sequelize, Sequelize) => {
	const Origin = sequelize.define("origin", {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	});

	return Origin;
};
