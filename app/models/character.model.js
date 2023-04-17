module.exports = (sequelize, Sequelize) => {
	const Character = sequelize.define("character", {
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

	return Character;
};
