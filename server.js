const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

var corsOptions = {
	origin: [process.env.APP_URL, process.env.TEST_APP_URL],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(process.env.STATIC_DIR));

// simple route
app.get("/", (req, res) => {
	res.json({ message: "Welcome to figuya-orine application." });
});

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/figurine.routes")(app);
require("./app/routes/utils.routes")(app);

const db = require("./app/models");

db.sequelize
	.sync()
	.then(() => {
		console.log("Synced db.");
	})
	.catch((err) => {
		console.log("Failed to sync db: " + err.message);
	});

const port = process.env.PORT || 3001;
app.listen(port, () => {
	console.log(`Server is up and running on ${port} ...`);
});
