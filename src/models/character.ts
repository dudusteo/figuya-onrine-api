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
	declare id: number;
	declare name: string;

	declare readonly createdAt: Date;
	declare readonly updatedAt: Date;
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
