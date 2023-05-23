import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "../config/env";

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
