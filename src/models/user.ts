import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

interface UserAttributes {
	id: number;
	username: string;
	password: string;
}

export interface UserInput extends Optional<UserAttributes, "id"> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
	public id!: number;
	public username!: string;
	public password!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
	}
);

export default User;
