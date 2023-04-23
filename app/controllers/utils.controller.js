const db = require("../models");

const getNextAutoIncrementId = (req, res) => {
	const { table } = req.query;
	const seq = `${table}_id_seq`;

	db.sequelize
		.query(`SELECT nextval('${seq}')`)
		.then(([result, metadata]) => {
			const nextId = result[0].nextval;
			res.json(nextId);
		})
		.catch((err) => {
			res.status(500).send({
				message: `Could not get next id for ${table}: ${err}`,
			});
		});
};

module.exports = {
	getNextAutoIncrementId,
};
