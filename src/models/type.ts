import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

interface TypeAttributes {
	id: number;
	name: string;

	createdAt?: Date;
	updatedAt?: Date;
}

export interface TypeInput extends Optional<TypeAttributes, "id"> {}

class Type extends Model<TypeAttributes, TypeInput> implements TypeAttributes {
	declare id: number;
	declare name: string;

	declare readonly createdAt: Date;
	declare readonly updatedAt: Date;
}

Type.init(
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
	},
	{
		sequelize,
	}
);

export default Type;
