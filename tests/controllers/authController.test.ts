import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../src/models/user";
import env from "../../src/config/env";
import { registerUser, loginUser } from "../../src/controllers/authController";

jest.mock("../../src/models/user", () => ({
	findOne: jest.fn(),
	create: jest.fn(),
}));

jest.mock("bcryptjs", () => ({
	hash: jest.fn(),
	compare: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
	sign: jest.fn(),
}));

describe("authController", () => {
	let req: Request;
	let res: Response;

	beforeEach(() => {
		req = {} as Request;
		res = {
			json: jest.fn(),
			status: jest.fn().mockReturnThis(),
		} as unknown as Response;
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("registerUser", () => {
		it("should register a new user and return a JWT token", async () => {
			const username = "testuser";
			const password = "testpassword";
			const hashedPassword = "hashedpassword";
			const token = "generatedtoken";

			req.body = { username, password };

			(User.findOne as jest.Mock).mockResolvedValue(null);
			(bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
			(User.create as jest.Mock).mockResolvedValue({ id: 1 });
			(jwt.sign as jest.Mock).mockReturnValue(token);

			await registerUser(req, res);

			expect(User.findOne).toHaveBeenCalledWith({ where: { username } });
			expect(User.create).toHaveBeenCalledWith({
				username,
				password: hashedPassword,
			});
			expect(jwt.sign).toHaveBeenCalledWith(
				{ userId: 1 },
				env.jwtSecret,
				{ expiresIn: "1h" }
			);
			expect(res.json).toHaveBeenCalledWith({ token });
		});

		it("should return an error if the username already exists", async () => {
			const username = "testuser";
			const password = "testpassword";

			req.body = { username, password };

			(User.findOne as jest.Mock).mockResolvedValue({ id: 1 });

			await registerUser(req, res);

			expect(User.findOne).toHaveBeenCalledWith({ where: { username } });
			expect(res.status).toHaveBeenCalledWith(400);
			expect(res.json).toHaveBeenCalledWith({
				error: "Username already exists",
			});
		});

		it("should return an error if an exception occurs", async () => {
			const username = "testuser";
			const password = "testpassword";

			req.body = { username, password };

			(User.findOne as jest.Mock).mockRejectedValue(
				new Error("Database error")
			);

			await registerUser(req, res);

			expect(User.findOne).toHaveBeenCalledWith({ where: { username } });
			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.json).toHaveBeenCalledWith({
				error: "Internal Server Error",
			});
		});
	});

	describe("loginUser", () => {
		it("should log in a user and return a JWT token", async () => {
			const username = "testuser";
			const password = "testpassword";
			const hashedPassword = "hashedpassword";
			const token = "generatedtoken";

			req.body = { username, password };

			(User.findOne as jest.Mock).mockResolvedValue({
				id: 1,
				password: hashedPassword,
			});
			(bcrypt.compare as jest.Mock).mockResolvedValue(true);
			(jwt.sign as jest.Mock).mockReturnValue(token);

			await loginUser(req, res);

			expect(User.findOne).toHaveBeenCalledWith({ where: { username } });
			expect(bcrypt.compare).toHaveBeenCalledWith(
				password,
				hashedPassword
			);
			expect(jwt.sign).toHaveBeenCalledWith(
				{ userId: 1 },
				env.jwtSecret,
				{ expiresIn: "1h" }
			);
			expect(res.json).toHaveBeenCalledWith({ token });
		});

		it("should return an error if the user does not exist", async () => {
			const username = "testuser";
			const password = "testpassword";

			req.body = { username, password };

			(User.findOne as jest.Mock).mockResolvedValue(null);

			await loginUser(req, res);

			expect(User.findOne).toHaveBeenCalledWith({ where: { username } });
			expect(res.status).toHaveBeenCalledWith(401);
			expect(res.json).toHaveBeenCalledWith({
				error: "Invalid credentials",
			});
		});

		it("should return an error if the password is incorrect", async () => {
			const username = "testuser";
			const password = "testpassword";
			const hashedPassword = "hashedpassword";

			req.body = { username, password };

			(User.findOne as jest.Mock).mockResolvedValue({
				id: 1,
				password: hashedPassword,
			});
			(bcrypt.compare as jest.Mock).mockResolvedValue(false);

			await loginUser(req, res);

			expect(User.findOne).toHaveBeenCalledWith({ where: { username } });
			expect(bcrypt.compare).toHaveBeenCalledWith(
				password,
				hashedPassword
			);
			expect(res.status).toHaveBeenCalledWith(401);
			expect(res.json).toHaveBeenCalledWith({
				error: "Invalid credentials",
			});
		});

		it("should return an error if an exception occurs", async () => {
			const username = "testuser";
			const password = "testpassword";

			req.body = { username, password };

			(User.findOne as jest.Mock).mockRejectedValue(
				new Error("Database error")
			);

			await loginUser(req, res);

			expect(User.findOne).toHaveBeenCalledWith({ where: { username } });
			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.json).toHaveBeenCalledWith({
				error: "Internal Server Error",
			});
		});
	});
});
