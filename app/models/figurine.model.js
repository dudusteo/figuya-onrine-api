module.exports = (sequelize, Sequelize) => {
	const Figurine = sequelize.define(
		"figurine",
		{
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
			},
			product_name: {
				type: Sequelize.STRING,
			},
			origin: {
				type: Sequelize.STRING,
			},
			company: {
				type: Sequelize.STRING,
			},
			type: {
				type: Sequelize.STRING,
			},
			condition: {
				type: Sequelize.STRING,
			},
			price: {
				type: Sequelize.INTEGER,
			},
		},
		{
			timestamps: false,
		}
	);

	return Figurine;
};
