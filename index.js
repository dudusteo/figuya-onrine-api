const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./src/routes/index");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(
	cors({
		origin: process.env.APP_URL,
		optionsSuccessStatus: 200,
	})
);

app.use(router);

app.options("*", cors());

const db = require("./src/models");

db.sequelize
	.sync()
	.then(() => {
		console.log("Synced db.");
	})
	.catch((err) => {
		console.log("Failed to sync db: " + err.message);
	});

app.listen(port, () => {
	console.log(`Server is up and running on ${port} ...`);
});
