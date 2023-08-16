import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

interface CompanyAttributes {
	id: number;
	name: string;

	createdAt?: Date;
	updatedAt?: Date;
}

export interface CompanyInput extends Optional<CompanyAttributes, "id"> {}

class Company
	extends Model<CompanyAttributes, CompanyInput>
	implements CompanyAttributes
{
	declare id: number;
	declare name: string;

	declare readonly createdAt: Date;
	declare readonly updatedAt: Date;
}

Company.init(
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

export default Company;
