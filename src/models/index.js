import User from "./user";
import Character from "./Character";

const models = {
	User: User.init(),
	Character: Character.init(),
};

models.Role.belongsToMany(models.User, {
	through: "userRoles",
	foreignKey: "roleId",
	otherKey: "userId",
});

models.User.belongsToMany(models.Role, {
	through: "userRoles",
	foreignKey: "userId",
	otherKey: "roleId",
});

models.Figurine.belongsToMany(models.Image, {
	through: "figurineImages",
	foreignKey: "figurineId",
	otherKey: "imageId",
});

models.Image.belongsToMany(models.Figurine, {
	through: "figurineImages",
	foreignKey: "imageId",
	otherKey: "figurineId",
});

models.Figurine.belongsToMany(models.Shipment, {
	through: "shipmentFigurines",
	foreignKey: "figurineId",
	otherKey: "shipmentId",
});

models.Shipment.belongsToMany(models.Figurine, {
	through: "shipmentFigurines",
	foreignKey: "shipmentId",
	otherKey: "figurineId",
});

models.Figurine.belongsTo(models.Character, {
	foreignKey: "characterId",
});

models.Figurine.belongsTo(models.Origin, {
	foreignKey: "originId",
});

models.Figurine.belongsTo(models.Company, {
	foreignKey: "companyId",
});

models.Figurine.belongsTo(models.Type, {
	foreignKey: "typeId",
});

export default models;
