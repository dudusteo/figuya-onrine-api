import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import env from "./config/env";
import { authRoutes } from "./routes/authRoutes";
import { userRoutes } from "./routes/userRoutes";
import { errorMiddleware } from "./middlewares/errorMiddleware";

const app = express();

const corsOptions: cors.CorsOptions = {
	origin: env.origin,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(env.static));

// Simple route
app.get("/", (req: Request, res: Response) => {
	res.json({ message: "Welcome to Figuya Onrine API." });
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.use(errorMiddleware);

app.listen(env.port, () => {
	console.log(`Server is up and running on ${env.port} ...`);
});
