import { sign, verify } from "jsonwebtoken";
import User from "../models/user";
import env from "./env";

interface JwtPayload {
	userId: string;
}

export function generateToken(user: User): string {
	const payload: JwtPayload = { userId: String(user.id) };
	return sign(payload, env.jwtSecret, { expiresIn: "1h" });
}

export function verifyToken(token: string): JwtPayload | null {
	try {
		const decoded = verify(token, env.jwtSecret) as JwtPayload;
		return decoded;
	} catch (error) {
		return null;
	}
}
