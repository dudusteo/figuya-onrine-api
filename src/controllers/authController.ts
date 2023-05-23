import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";
import env from "../config/env";

export async function registerUser(req: Request, res: Response) {
	try {
		const { username, password } = req.body;

		// Check if the username already exists
		const existingUser = await User.findOne({ where: { username } });
		if (existingUser) {
			return res.status(400).json({ error: "Username already exists" });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new user record
		const newUser = await User.create({
			username,
			password: hashedPassword,
		});

		// Generate JWT token
		const token = jwt.sign({ userId: newUser.id }, env.jwtSecret, {
			expiresIn: "1h",
		});

		res.json({ token });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export async function loginUser(req: Request, res: Response) {
	try {
		const { username, password } = req.body;

		// Find the user by username
		const user = await User.findOne({ where: { username } });
		if (!user) {
			return res.status(401).json({ error: "Invalid credentials" });
		}

		// Check if the password is correct
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({ error: "Invalid credentials" });
		}

		// Generate JWT token
		const token = jwt.sign({ userId: user.id }, env.jwtSecret, {
			expiresIn: "1h",
		});

		res.json({ token });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}
