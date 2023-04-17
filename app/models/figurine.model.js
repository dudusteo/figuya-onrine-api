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
			type: Sequelize.INTEGER,
			allowNull: false,
		},
	});

	return Figurine;
};
