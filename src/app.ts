import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import env from "./config/env";
import { authRoutes } from "./routes/authRoutes";
import { userRoutes } from "./routes/userRoutes";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import sequelize from "./config/database";
import { figurineRoutes } from "./routes/figurineRoutes";

const app = express();

const corsOptions: cors.CorsOptions = {
	origin: env.origin,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(env.static));

// Simple route
app.get("/api", (req: Request, res: Response) => {
	res.json({ message: "Welcome to Figuya Onrine API." });
});

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/figurine", figurineRoutes);

app.use(errorMiddleware);

// Sync the models with the database to create the tables
sequelize
	.sync({ force: true })
	.then(() => {
		console.log("Tables created successfully.");
	})
	.catch((error: Error) => {
		console.error("Failed to create tables:", error);
	});

app.listen(env.port, () => {
	console.log(`Server is up and running on ${env.port} ...`);
});
