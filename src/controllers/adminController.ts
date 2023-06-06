import { Request, Response } from "express";
import Figurine, { FigurineInput } from "../models/figurine";
import Character from "../models/character";

export async function createFigurine(req: Request, res: Response) {
	try {
		const { name, condition, price, character: characterName } = req.body;

		const characterPromise = Character.findOrCreate({
			where: { name: characterName },
		}).then(([character, created]) => character);

		const [character] = await Promise.all([characterPromise]);

		const figurineInput: FigurineInput = {
			name,
			condition,
			price,
			characterId: character.id,
		};

		const figurine = await Figurine.create(figurineInput);

		res.status(201).json({ figurine });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}
