import { Sequelize } from "sequelize";
import env from "./env";

const sequelize = new Sequelize(env.dbName, env.dbUser, env.dbPassword, {
	host: env.dbHost,
	dialect: env.dbDriver,
	port: env.dbPort,
});

export default sequelize;
