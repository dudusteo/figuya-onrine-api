import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

interface UserAttributes {
	id: number;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	password: string;
}

export interface UserInput extends Optional<UserAttributes, "id"> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
	declare id: number;
	declare username: string;
	declare email: string;
	declare firstName: string;
	declare lastName: string;
	declare password: string;

	declare readonly createdAt: Date;
	declare readonly updatedAt: Date;
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
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
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
