const db = require("../models");
require("dotenv").config();

const Figurine = db.figurines;
const Image = db.images;
const Character = db.characters;
const Origin = db.origins;
const Company = db.companies;
const Type = db.types;

const addFigurine = (req, res) => {
	try {
		const characterPromise = Character.findOrCreate({
			where: { name: req.body.character },
		}).then(([character, created]) => character);
		const originPromise = Origin.findOrCreate({
			where: { name: req.body.origin },
		}).then(([origin, created]) => origin);
		const companyPromise = Company.findOrCreate({
			where: { name: req.body.company },
		}).then(([company, created]) => company);
		const typePromise = Type.findOrCreate({
			where: { name: req.body.type },
		}).then(([type, created]) => type);

		return Promise.all([
			characterPromise,
			originPromise,
			companyPromise,
			typePromise,
		])
			.then((results) => {
				const [character, origin, company, type] = results;

				Figurine.create({
					name: req.body.name,
					character_id: character.id,
					origin_id: origin.id,
					company_id: company.id,
					type_id: type.id,
					condition: req.body.condition,
					price: req.body.price,
				})
					.then((figurine) => {
						if (figurine) {
							const promises = req.files.map((element) => {
								return Image.create({
									path:
										process.env.API_URL +
										"/static/" +
										element.filename,
								}).then((image) => {
									return figurine.addImage(image);
								});
							});
							Promise.all(promises).then(() => {
								res.send({
									message: `Figurine ${figurine.name} was created successfully!`,
								});
							});
						}
					})
					.catch((err) =>
						res.status(500).send({
							message: `Could not create figurine in database: ${err}`,
						})
					);
			})
			.catch((err) =>
				res.status(500).send({
					message: `Could not get figurine options in database: ${err}`,
				})
			);
	} catch (err) {
		if (err.code == "LIMIT_FILE_SIZE") {
			return res.status(500).send({
				message: "File size cannot be larger than 2MB!",
			});
		}

		res.status(500).send({
			message: `Could not upload the file: ${req.files}. ${err}`,
		});
	}
};

const getFigurines = (req, res) => {
	Figurine.findAll({ include: [Character, Origin, Company, Type] }).then(
		(figurines) => {
			const figurineList = figurines.map((figurine) => {
				return figurine.getImages().then((images) => {
					return {
						id: figurine.id,
						name: figurine.name,
						character: figurine.character,
						origin: figurine.origin,
						company: figurine.company,
						type: figurine.type,
						condition: figurine.condition,
						price: figurine.price,
						images: images,
					};
				});
			});
			Promise.all(figurineList).then((result) => {
				res.json(result);
			});
		}
	);
};

const addCharacterOption = (req, res) => {
	Character.create({ name: req.body.name })
		.then((character) => {
			res.send({
				message: `Character option ${character.name} was created successfully!`,
			});
		})
		.catch((err) =>
			res.status(500).send({
				message: `Could not create character option in database: ${err}`,
			})
		);
};

const addOriginOption = (req, res) => {
	Origin.create({ name: req.body.name })
		.then((origin) => {
			res.send({
				message: `Origin option ${origin.name} was created successfully!`,
			});
		})
		.catch((err) =>
			res.status(500).send({
				message: `Could not create origin option in database: ${err}`,
			})
		);
};

const addCompanyOption = (req, res) => {
	Company.create({ name: req.body.name })
		.then((company) => {
			res.send({
				message: `Company option ${company.name} was created successfully!`,
			});
		})
		.catch((err) =>
			res.status(500).send({
				message: `Could not create company option in database: ${err}`,
			})
		);
};

const addTypeOption = (req, res) => {
	Type.create({ name: req.body.name })
		.then((type) => {
			res.send({
				message: `Type option ${type.name} was created successfully!`,
			});
		})
		.catch((err) =>
			res.status(500).send({
				message: `Could not create type option in database: ${err}`,
			})
		);
};

const getOptions = (req, res) => {
	const characterPromise = Character.findAll({ attributes: ["id", "name"] });
	const originPromise = Origin.findAll({ attributes: ["id", "name"] });
	const companyPromise = Company.findAll({ attributes: ["id", "name"] });
	const typePromise = Type.findAll({ attributes: ["id", "name"] });

	return Promise.all([
		characterPromise,
		originPromise,
		companyPromise,
		typePromise,
	])
		.then((results) => {
			const [character, origin, company, type] = results;

			const result = {
				character: character,
				origin: origin,
				company: company,
				type: type,
			};

			res.json(result);
		})
		.catch((err) =>
			res.status(500).send({
				message: `Could not get figurine options in database: ${err}`,
			})
		);
};

module.exports = {
	addFigurine,
	getFigurines,
	addCharacterOption,
	addOriginOption,
	addCompanyOption,
	addTypeOption,
	getOptions,
};
