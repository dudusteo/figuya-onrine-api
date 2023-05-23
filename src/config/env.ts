import dotenv from "dotenv";
import { Dialect } from "sequelize";
dotenv.config();

interface envAttributes {
	dbDriver: Dialect;
	[x: string]: any;
}

const env: envAttributes = {
	origin: process.env.APP_URL || "http://localhost:3000",

	port: process.env.API_PORT || 3001,
	static: process.env.STATIC_DIR || "public",
	jwtSecret: process.env.JWT_SECRET || "secret",

	dbName: process.env.DB_NAME || "api",
	dbUser: process.env.DB_USER || "api",
	dbPassword: process.env.DB_PASSWORD,
	dbHost: process.env.DB_HOST,
	dbDriver: (process.env.DB_DRIVER as Dialect) || ("postgres" as Dialect),
	dbPort: process.env.DB_Port || 5432,
};

export default env;
