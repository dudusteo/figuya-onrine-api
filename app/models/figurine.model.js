module.exports = (sequelize, Sequelize) => {
	const Figurine = sequelize.define(
		"figurine",
		{
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
			character: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			origin: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			company: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			type: {
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
		},
		{
			timestamps: false,
		}
	);

	return Figurine;
};
