import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

interface CharacterAttributes {
	id: number;
	name: string;

	createdAt?: Date;
	updatedAt?: Date;
}

export interface CharacterInput extends Optional<CharacterAttributes, "id"> {}

class Character
	extends Model<CharacterAttributes, CharacterInput>
	implements CharacterAttributes
{
	public id!: number;
	public name!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Character.init(
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

export default Character;
