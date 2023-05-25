import { Request, Response } from "express";
import Figurine from "../models/figurine";

export async function getAllFigurines(req: Request, res: Response) {
	try {
		const figurines = await Figurine.findAll();
		res.status(200).json(figurines);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}
