import { Request, Response } from "express";
import User from "../models/user";

export async function getAllUsers(req: Request, res: Response) {
	try {
		const users = await User.findAll();
		res.json(users);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export async function getUserById(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const user = await User.findByPk(id);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		res.json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export async function createUser(req: Request, res: Response) {
	try {
		const { username, password } = req.body;
		const newUser = await User.create({ username, password });
		res.status(201).json(newUser);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export async function updateUser(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const { username, password } = req.body;

		const user = await User.findByPk(id);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		await user.update({ username, password });

		res.json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export async function deleteUser(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const user = await User.findByPk(id);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		await user.destroy();

		res.sendStatus(204);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}
