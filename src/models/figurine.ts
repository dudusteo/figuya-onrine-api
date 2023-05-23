import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

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
	public id!: number;
	public name!: string;
	public condition!: string;
	public price!: number;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
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

export default Figurine;
