module.exports = (sequelize, Sequelize) => {
	const shipment = sequelize.define("Shipment", {
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
		itemCost: {
			type: Sequelize.DECIMAL(10, 2),
			allowNull: false,
		},
		shipmentCost: {
			type: Sequelize.DECIMAL(10, 2),
			allowNull: false,
		},
		additionalCost: {
			type: Sequelize.DECIMAL(10, 2),
			allowNull: false,
		},
	});

	return shipment;
};
