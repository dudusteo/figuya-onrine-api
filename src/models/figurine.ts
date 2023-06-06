import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";
import Character from "./character";

interface FigurineAttributes {
	id: number;
	name: string;
	condition: string;
	price: number;

	createdAt?: Date;
	updatedAt?: Date;
}

export interface FigurineInput extends Optional<FigurineAttributes, "id"> {}

class Figurine
	extends Model<FigurineAttributes, FigurineInput>
	implements FigurineAttributes
{
	declare id: number;
	declare name: string;
	declare condition: string;
	declare price: number;

	declare readonly createdAt: Date;
	declare readonly updatedAt: Date;
}

Figurine.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		condition: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		price: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
	},
	{
		sequelize,
	}
);

Figurine.belongsTo(Character, {
	foreignKey: "characterId",
});

export default Figurine;
