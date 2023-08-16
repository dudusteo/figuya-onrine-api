import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

interface OriginAttributes {
	id: number;
	name: string;

	createdAt?: Date;
	updatedAt?: Date;
}

export interface OriginInput extends Optional<OriginAttributes, "id"> {}

class Origin
	extends Model<OriginAttributes, OriginInput>
	implements OriginAttributes
{
	declare id: number;
	declare name: string;

	declare readonly createdAt: Date;
	declare readonly updatedAt: Date;
}

Origin.init(
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

export default Origin;
