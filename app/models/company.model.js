module.exports = (sequelize, Sequelize) => {
	const Company = sequelize.define("company", {
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

	return Company;
};
