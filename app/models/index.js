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
	through: "user_roles",
	foreignKey: "role_id",
	otherKey: "user_id",
});

db.users.belongsToMany(db.roles, {
	through: "user_roles",
	foreignKey: "user_id",
	otherKey: "role_id",
});

db.figurines.belongsToMany(db.images, {
	through: "figurine_images",
	foreignKey: "figurine_id",
	otherKey: "image_id",
});

db.images.belongsToMany(db.figurines, {
	through: "figurine_images",
	foreignKey: "image_id",
	otherKey: "figurine_id",
});

db.figurines.belongsToMany(db.packages, {
	through: "package_figurines",
	foreignKey: "figurine_id",
	otherKey: "package_id",
});

db.packages.belongsToMany(db.figurines, {
	through: "package_figurines",
	foreignKey: "package_id",
	otherKey: "figurine_id",
});

db.figurines.belongsTo(db.characters, {
	foreignKey: "character_id",
});

db.figurines.belongsTo(db.origins, {
	foreignKey: "origin_id",
});

db.figurines.belongsTo(db.companies, {
	foreignKey: "company_id",
});

db.figurines.belongsTo(db.types, {
	foreignKey: "type_id",
});

db.ROLES = ["user", "admin"];

module.exports = db;
