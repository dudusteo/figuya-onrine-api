import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "../config/env";
import User, { UserRole } from "../models/user";

interface JwtPayload {
	userId: string;
}

interface AuthenticatedRequest extends Request {
	userId?: string;
}

export function authMiddleware(
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) {
	const token = req.headers.authorization?.split(" ")[1];

	if (!token) {
		return res.status(401).json({ error: "Authorization token not found" });
	}

	try {
		const decoded = jwt.verify(token, env.jwtSecret) as JwtPayload;
		req.userId = decoded.userId;
		next();
	} catch (error) {
		return res.status(401).json({ error: "Invalid token" });
	}
}

export const isAdmin = (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	User.findByPk(req.userId).then((user) => {
		if (!user) {
			throw new Error("User not found");
		}

		if (user.role === UserRole.ADMIN) {
			next();
		} else {
			res.status(403).json({ error: "Unauthorized" });
		}
	});
};
