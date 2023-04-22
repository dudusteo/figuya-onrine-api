module.exports = (sequelize, Sequelize) => {
	const Package = sequelize.define("package", {
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
		item_cost: {
			type: Sequelize.DECIMAL(10, 2),
			allowNull: false,
		},
		shipment_cost: {
			type: Sequelize.DECIMAL(10, 2),
			allowNull: false,
		},
		additional_cost: {
			type: Sequelize.DECIMAL(10, 2),
			allowNull: false,
		},
	});

	return Package;
};
