import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { registerUser, loginUser } from "../../src/controllers/authController";
import User from "../../src/models/user";
import env from "../../src/config/env";
import { Op } from "sequelize";

jest.mock("../../src/models/user"); // Mocking the User model

describe("Auth Controller", () => {
	let req: Partial<Request>;
	let res: Partial<Response>;

	beforeEach(() => {
		req = {};
		res = {
			json: jest.fn(),
			status: jest.fn().mockReturnThis(),
		};
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("registerUser", () => {
		it("should register a new user", async () => {
			const mockRequest = {
				body: {
					username: "testuser",
					email: "testuser@example.com",
					firstName: "Test",
					lastName: "User",
					password: "testpassword",
				},
			} as Request;

			const mockUser = {
				id: "123",
				...mockRequest.body,
			};

			const mockToken = "mocktoken";

			(User.findOne as jest.Mock) = jest.fn().mockResolvedValue(null);
			(bcrypt.hash as jest.Mock) = jest
				.fn()
				.mockResolvedValue("hashedpassword");
			(User.create as jest.Mock) = jest.fn().mockResolvedValue(mockUser);
			(jwt.sign as jest.Mock) = jest.fn().mockReturnValue(mockToken);

			await registerUser(mockRequest, res as Response);

			expect(User.findOne).toHaveBeenCalledTimes(1);
			expect(User.findOne).toHaveBeenCalledWith({
				where: {
					[Op.or]: [
						{ username: mockRequest.body.username },
						{ email: mockRequest.body.email },
					],
				},
			});

			expect(bcrypt.hash).toHaveBeenCalledTimes(1);
			expect(bcrypt.hash).toHaveBeenCalledWith(
				mockRequest.body.password,
				10
			);

			expect(User.create).toHaveBeenCalledTimes(1);
			expect(User.create).toHaveBeenCalledWith({
				username: mockRequest.body.username,
				email: mockRequest.body.email,
				firstName: mockRequest.body.firstName,
				lastName: mockRequest.body.lastName,
				password: "hashedpassword",
			});

			expect(jwt.sign).toHaveBeenCalledTimes(1);
			expect(jwt.sign).toHaveBeenCalledWith(
				{ userId: mockUser.id },
				env.jwtSecret,
				{ expiresIn: "1h" }
			);

			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith({ token: mockToken });
		});

		it("should return an error if username or email already exists", async () => {
			const mockRequest = {
				body: {
					username: "testuser",
					email: "testuser@example.com",
					firstName: "Test",
					lastName: "User",
					password: "testpassword",
				},
			} as Request;

			(User.findOne as jest.Mock) = jest.fn().mockResolvedValue(true);

			await registerUser(mockRequest, res as Response);

			expect(User.findOne).toHaveBeenCalledTimes(1);
			expect(User.findOne).toHaveBeenCalledWith({
				where: {
					[Op.or]: [
						{ username: mockRequest.body.username },
						{ email: mockRequest.body.email },
					],
				},
			});

			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(400);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith({
				error: "Username or Email already exists",
			});
		});

		it("should handle internal server errors", async () => {
			const mockRequest = {
				body: {
					username: "testuser",
					email: "testuser@example.com",
					firstName: "Test",
					lastName: "User",
					password: "testpassword",
				},
			} as Request;

			(User.findOne as jest.Mock) = jest
				.fn()
				.mockRejectedValue(new Error("Database error"));

			await registerUser(mockRequest, res as Response);

			expect(User.findOne).toHaveBeenCalledTimes(1);

			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith({
				error: "Internal Server Error",
			});
		});
	});

	describe("loginUser", () => {
		it("should log in a user", async () => {
			const mockRequest = {
				body: {
					login: "testuser",
					password: "testpassword",
				},
			} as Request;

			const mockUser = {
				id: "123",
				username: "testuser",
				email: "testuser@example.com",
				firstName: "Test",
				lastName: "User",
				password: "hashedpassword",
			};

			const mockToken = "mocktoken";

			(User.findOne as jest.Mock) = jest.fn().mockResolvedValue(mockUser);
			(bcrypt.compare as jest.Mock) = jest.fn().mockResolvedValue(true);
			(jwt.sign as jest.Mock) = jest.fn().mockReturnValue(mockToken);

			await loginUser(mockRequest, res as Response);

			expect(User.findOne).toHaveBeenCalledTimes(1);
			expect(User.findOne).toHaveBeenCalledWith({
				where: {
					[Op.or]: [
						{ username: mockRequest.body.login },
						{ email: mockRequest.body.login },
					],
				},
			});

			expect(bcrypt.compare).toHaveBeenCalledTimes(1);
			expect(bcrypt.compare).toHaveBeenCalledWith(
				mockRequest.body.password,
				mockUser.password
			);

			expect(jwt.sign).toHaveBeenCalledTimes(1);
			expect(jwt.sign).toHaveBeenCalledWith(
				{ userId: mockUser.id },
				env.jwtSecret,
				{ expiresIn: "1h" }
			);

			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith({ token: mockToken });
		});

		it("should return an error for invalid credentials", async () => {
			const mockRequest = {
				body: {
					login: "testuser",
					password: "testpassword",
				},
			} as Request;

			(User.findOne as jest.Mock) = jest.fn().mockResolvedValue(null);

			await loginUser(mockRequest, res as Response);

			expect(User.findOne).toHaveBeenCalledTimes(1);
			expect(User.findOne).toHaveBeenCalledWith({
				where: {
					[Op.or]: [
						{ username: mockRequest.body.login },
						{ email: mockRequest.body.login },
					],
				},
			});

			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(401);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith({
				error: "Invalid credentials",
			});
		});

		it("should handle internal server errors", async () => {
			const mockRequest = {
				body: {
					login: "testuser",
					password: "testpassword",
				},
			} as Request;

			(User.findOne as jest.Mock) = jest
				.fn()
				.mockRejectedValue(new Error("Database error"));

			await loginUser(mockRequest, res as Response);

			expect(User.findOne).toHaveBeenCalledTimes(1);

			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith({
				error: "Internal Server Error",
			});
		});
	});
});
