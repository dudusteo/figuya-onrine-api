import { Request, Response } from "express";
import Figurine, { FigurineInput } from "../models/figurine";

export async function createFigurine(req: Request, res: Response) {
	try {
		// Extract the necessary data from the request body
		const { name, condition, price } = req.body;

		// Prepare the figurine input object
		const figurineInput: FigurineInput = {
			name,
			condition,
			price,
		};

		// Create the figurine
		const figurine = await Figurine.create(figurineInput);

		// Return the created figurine in the response
		res.status(201).json({ figurine });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}
