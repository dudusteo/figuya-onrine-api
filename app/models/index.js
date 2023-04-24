const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		dialect: "postgres",
		operatorsAliases: false,
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
	}
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model")(sequelize, Sequelize);
db.roles = require("./role.model")(sequelize, Sequelize);
db.figurines = require("./figurine.model")(sequelize, Sequelize);
db.characters = require("./character.model")(sequelize, Sequelize);
db.origins = require("./origin.model")(sequelize, Sequelize);
db.companies = require("./company.model")(sequelize, Sequelize);
db.types = require("./type.model")(sequelize, Sequelize);
db.images = require("./image.model")(sequelize, Sequelize);
db.packages = require("./package.model")(sequelize, Sequelize);

db.roles.belongsToMany(db.users, {
	through: "userRoles",
	foreignKey: "roleId",
	otherKey: "userId",
});

db.users.belongsToMany(db.roles, {
	through: "userRoles",
	foreignKey: "userId",
	otherKey: "roleId",
});

db.figurines.belongsToMany(db.images, {
	through: "figurineImages",
	foreignKey: "figurineId",
	otherKey: "imageId",
});

db.images.belongsToMany(db.figurines, {
	through: "figurineImages",
	foreignKey: "imageId",
	otherKey: "figurineId",
});

db.figurines.belongsToMany(db.packages, {
	through: "packageFigurines",
	foreignKey: "figurineId",
	otherKey: "packageId",
});

db.packages.belongsToMany(db.figurines, {
	through: "packageFigurines",
	foreignKey: "packageId",
	otherKey: "figurineId",
});

db.figurines.belongsTo(db.characters, {
	foreignKey: "characterId",
});

db.figurines.belongsTo(db.origins, {
	foreignKey: "originId",
});

db.figurines.belongsTo(db.companies, {
	foreignKey: "companyId",
});

db.figurines.belongsTo(db.types, {
	foreignKey: "typeId",
});

db.ROLES = ["user", "admin"];

module.exports = db;
