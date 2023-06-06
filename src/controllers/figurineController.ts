import { Request, Response } from "express";
import Figurine from "../models/figurine";
import Character from "../models/character";

export async function getAllFigurines(req: Request, res: Response) {
	try {
		const figurines = await Figurine.findAll();
		res.status(200).json(figurines);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export async function getFigurineById(req: Request, res: Response) {
	try {
		const { id } = req.body;

		Figurine.findOne({
			where: { id: id },
			include: [Character],
		}).then((figurine) => {
			if (figurine) {
				res.status(200).json(figurine);
			} else {
				res.status(404).send({
					message: `Figurine with the id: ${id} not found`,
				});
			}
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}
