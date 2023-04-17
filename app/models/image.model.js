module.exports = (sequelize, Sequelize) => {
	const Image = sequelize.define("image", {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		path: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	});

	return Image;
};
