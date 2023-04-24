module.exports = (sequelize, Sequelize) => {
	const Figurine = sequelize.define("figurine", {
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
		condition: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		price: {
			type: Sequelize.DECIMAL(10, 2),
			allowNull: false,
		},
		soldAt: {
			type: Sequelize.DATE,
			allowNull: true,
		},
	});

	return Figurine;
};
