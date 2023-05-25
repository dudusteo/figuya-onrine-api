import { Request, Response } from "express";
import User from "../models/user";

export async function getAllUsers(req: Request, res: Response) {
	try {
		const users = await User.findAll();
		res.status(200).json(users);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

interface AuthenticatedRequest extends Request {
	userId?: string;
}

export async function getCurrentUser(req: AuthenticatedRequest, res: Response) {
	try {
		const user = await User.findByPk(req.userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		res.status(200).json(user);
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
		res.status(200).json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export async function createUser(req: Request, res: Response) {
	try {
		const { username, email, firstName, lastName, password } = req.body;
		const newUser = await User.create({
			username,
			email,
			firstName,
			lastName,
			password,
		});
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

		const user = await User.update(
			{ username, password },
			{ where: { id } }
		);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		res.status(200).json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export async function deleteUser(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const user = await User.destroy({ where: { id } });

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		res.sendStatus(204);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}
