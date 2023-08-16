import { Request, Response } from "express";
import Figurine, { FigurineInput } from "../models/figurine";
import Character from "../models/character";
import Origin from "../models/origin";
import Company from "../models/company";
import Type from "../models/type";

export async function createFigurine(req: Request, res: Response) {
	try {
		const {
			name,
			condition,
			price,
			character: characterName,
			origin: originName,
			company: companyName,
			type: typeName,
		} = req.body;

		console.log("--------------------------------------------");
		console.log(req.body);

		const characterPromise = Character.findOrCreate({
			where: { name: characterName },
		}).then(([character, created]) => character);

		const originPromise = Origin.findOrCreate({
			where: { name: originName },
		}).then(([origin, created]) => origin);

		const companyPromise = Company.findOrCreate({
			where: { name: companyName },
		}).then(([company, created]) => company);

		const typePromise = Type.findOrCreate({
			where: { name: typeName },
		}).then(([type, created]) => type);

		const [character, origin, company, type] = await Promise.all([
			characterPromise,
			originPromise,
			companyPromise,
			typePromise,
		]);

		const figurineInput: FigurineInput = {
			name,
			condition,
			price,
			characterId: character.id,
			originId: origin.id,
			companyId: company.id,
			typeId: type.id,
		};

		const figurine = await Figurine.create(figurineInput);

		res.status(201).json({ figurine });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}
