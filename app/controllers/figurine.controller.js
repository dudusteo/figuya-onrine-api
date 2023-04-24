const { Op } = require("sequelize");
const db = require("../models");
require("dotenv").config();

const Figurine = db.figurines;
const Image = db.images;
const Character = db.characters;
const Origin = db.origins;
const Company = db.companies;
const Type = db.types;
const Package = db.packages;

//Add or update figurine
const addFigurine = async (req, res) => {
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

		const [character, origin, company, type] = await Promise.all([
			characterPromise,
			originPromise,
			companyPromise,
			typePromise,
		]);

		const [figurine, created] = await Figurine.findOrCreate({
			where: { id: req.body.id },
			defaults: {
				name: req.body.name,
				characterId: character.id,
				originId: origin.id,
				companyId: company.id,
				typeId: type.id,
				condition: req.body.condition,
				price: req.body.price,
			},
		});

		if (!created) {
			await figurine.update({
				name: req.body.name,
				characterId: character.id,
				originId: origin.id,
				companyId: company.id,
				typeId: type.id,
				condition: req.body.condition,
				price: req.body.price,
			});
		}

		const promises = req.files.map((element) => {
			return Image.create({
				path: "/static/" + element.filename,
			}).then((image) => figurine.addImage(image));
		});

		const [package, createdPackage] = await Package.findOrCreate({
			where: { id: req.body.packageId },
		});

		await figurine.addPackage(package);

		await Promise.all(promises);

		res.send({
			message: `Figurine ${figurine.name} was created successfully!`,
		});
	} catch (err) {
		if (err.code == "LIMIT_FILE_SIZE") {
			return res.status(500).send({
				message: "File size cannot be larger than 2MB!",
			});
		}

		res.status(500).send({
			message: `Could not create or update figurine in database: ${err}`,
		});
	}
};

//Show all non sold figurines
const getAllFigurines = (req, res) => {
	Figurine.findAll({
		where: { soldAt: { [Op.is]: null } },
		include: [Character, Origin, Company, Type],
	}).then((figurines) => {
		const figurineList = figurines.map((figurine) => {
			return figurine.getImages().then((images) => {
				return {
					id: figurine.id,
					name: figurine.name,
					character: figurine.character.name,
					origin: figurine.origin.name,
					company: figurine.company.name,
					type: figurine.type.name,
					condition: figurine.condition,
					price: figurine.price,
					images: images,
				};
			});
		});
		Promise.all(figurineList).then((result) => {
			res.json(result);
		});
	});
};

//Show one non sold figurines
const getFigurine = (req, res) => {
	const { id } = req.query;
	Figurine.findOne({
		where: { id: id, soldAt: { [Op.is]: null } },
		include: [Character, Origin, Company, Type],
	}).then((figurine) => {
		if (figurine) {
			figurine.getImages().then((images) => {
				res.json({
					id: figurine.id,
					name: figurine.name,
					character: figurine.character.name,
					origin: figurine.origin.name,
					company: figurine.company.name,
					type: figurine.type.name,
					condition: figurine.condition,
					price: figurine.price,
					images: images,
				});
			});
		} else {
			res.status(404).send({
				message: `Figurine with the id: ${id} not found`,
			});
		}
	});
};

//Get all figurines using packageId
const getFigurinesByPackage = (req, res) => {
	Package.findOne({
		where: { id: req.query.packageId },
	})
		.then((package) => {
			Figurine.findAll({
				include: [
					Character,
					Origin,
					Company,
					Type,
					{
						model: Package,
						where: {
							id: package.id,
						},
						through: {
							attributes: [],
						},
					},
				],
			})
				.then((figurines) => {
					const figurineList = figurines.map((figurine) => {
						return figurine.getImages().then((images) => {
							return {
								id: figurine.id,
								name: figurine.name,
								character: figurine.character.name,
								origin: figurine.origin.name,
								company: figurine.company.name,
								type: figurine.type.name,
								condition: figurine.condition,
								price: figurine.price,
								soldAt: figurine.soldAt,
								images: images,
							};
						});
					});
					Promise.all(figurineList).then((result) => {
						res.json(result);
					});
				})
				.catch((err) =>
					res.status(500).send({
						message: `Could not find figurines for package ${req.query.packageId}: ${err}`,
					})
				);
		})
		.catch((err) =>
			res.status(500).send({
				message: `Could not find package ${req.query.packageName}: ${err}`,
			})
		);
};

//deprecated
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

//deprecated
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

//deprecated
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

//deprecated
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

// Add or update new package
const addPackage = (req, res) => {
	Package.findOrCreate({
		where: {
			id: req.body.id,
		},
		defaults: {
			name: req.body.name,
			itemCost: req.body.itemCost,
			shipmentCost: req.body.shipmentCost,
			additionalCost: req.body.additionalCost,
		},
	})
		.then(([package, created]) => {
			if (!created) {
				package
					.update({
						name: req.body.name,
						itemCost: req.body.itemCost,
						shipmentCost: req.body.shipmentCost,
						additionalCost: req.body.additionalCost,
					})
					.then(() => {
						res.send({
							message: `Package option ${package.name} was updated successfully!`,
						});
					})
					.catch((err) => {
						res.status(500).send({
							message: `Could not update package option in database: ${err}`,
						});
					});
			} else {
				res.send({
					message: `Package option ${package.name} was created successfully!`,
				});
			}
		})
		.catch((err) =>
			res.status(500).send({
				message: `Could not create package option in database: ${err}`,
			})
		);
};

// Get all options for bar
const getOptions = (req, res) => {
	const characterPromise = Character.findAll();
	const originPromise = Origin.findAll();
	const companyPromise = Company.findAll();
	const typePromise = Type.findAll();

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

// Get all packages
const getPackages = (req, res) => {
	Package.findAll()
		.then((package) => {
			res.json(package);
		})
		.catch((err) =>
			res.status(500).send({
				message: `Could not get package options in database: ${err}`,
			})
		);
};

// For admin testing, probably will be modified to soldAt = date()
const removeFigurine = async (req, res) => {
	const { id } = req.query;

	Figurine.destroy({ where: { id } }).then((number) =>
		number == 1
			? res.send({
					message: "Figurine was deleted successfully!",
			  })
			: res.status(500).send({
					message: `Cannot delete Figurine with id=${id}. Maybe Figurine was not found!`,
			  })
	);
};

module.exports = {
	addFigurine,
	getAllFigurines,
	getFigurine,
	removeFigurine,
	getFigurinesByPackage,
	// addCharacterOption,
	// addOriginOption,
	// addCompanyOption,
	// addTypeOption,
	addPackage,
	getOptions,
	getPackages,
};
