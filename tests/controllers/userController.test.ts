import { Request, Response } from "express";
import User from "../../src/models/user";
import {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
} from "../../src/controllers/userController";

jest.mock("../../src/models/user", () => ({
	findAll: jest.fn(),
	findByPk: jest.fn(),
	create: jest.fn(),
	update: jest.fn(),
	destroy: jest.fn(),
}));

describe("userController", () => {
	let req: Request;
	let res: Response;

	beforeEach(() => {
		req = {} as Request;
		res = {
			json: jest.fn(),
			status: jest.fn().mockReturnThis(),
			sendStatus: jest.fn(),
		} as unknown as Response;
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("getAllUsers", () => {
		it("should get all users", async () => {
			const users = [
				{
					id: 1,
					username: "user1",
					email: "email1@email.com",
					firstName: "firstName1",
					lastName: "lastName1",
				},
				{
					id: 2,
					username: "user2",
					email: "email2@email.com",
					firstName: "firstName2",
					lastName: "lastName2",
				},
			];

			(User.findAll as jest.Mock).mockResolvedValue(users);

			await getAllUsers(req, res);

			expect(User.findAll).toHaveBeenCalled();
			expect(res.json).toHaveBeenCalledWith(users);
		});

		it("should handle errors and return an error response", async () => {
			const error = new Error("Database error");

			(User.findAll as jest.Mock).mockRejectedValue(error);

			await getAllUsers(req, res);

			expect(User.findAll).toHaveBeenCalled();
			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.json).toHaveBeenCalledWith({
				error: "Internal Server Error",
			});
		});
	});

	describe("getUserById", () => {
		it("should get a user by ID", async () => {
			const id = "1";
			const user = {
				id: 1,
				username: "user1",
				email: "email1@email.com",
				firstName: "firstName1",
				lastName: "lastName1",
			};

			req.params = { id };

			(User.findByPk as jest.Mock).mockResolvedValue(user);

			await getUserById(req, res);

			expect(User.findByPk).toHaveBeenCalledWith(id);
			expect(res.json).toHaveBeenCalledWith(user);
		});

		it("should return an error if the user is not found", async () => {
			const id = "1";

			req.params = { id };

			(User.findByPk as jest.Mock).mockResolvedValue(null);

			await getUserById(req, res);

			expect(User.findByPk).toHaveBeenCalledWith(id);
			expect(res.status).toHaveBeenCalledWith(404);
			expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
		});

		it("should handle errors and return an error response", async () => {
			const id = "1";
			const error = new Error("Database error");

			req.params = { id };

			(User.findByPk as jest.Mock).mockRejectedValue(error);

			await getUserById(req, res);

			expect(User.findByPk).toHaveBeenCalledWith(id);
			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.json).toHaveBeenCalledWith({
				error: "Internal Server Error",
			});
		});
	});

	describe("createUser", () => {
		it("should create a new user", async () => {
			const username = "user1";
			const email = "testemail@email.com";
			const firstName = "testfirstname";
			const lastName = "testlastname";
			const password = "password1";
			const newUser = {
				id: 1,
				username,
				email,
				firstName,
				lastName,
				password,
			};

			req.body = { username, email, firstName, lastName, password };

			(User.create as jest.Mock).mockResolvedValue(newUser);

			await createUser(req, res);

			expect(User.create).toHaveBeenCalledWith({
				username,
				email,
				firstName,
				lastName,
				password,
			});
			expect(res.status).toHaveBeenCalledWith(201);
			expect(res.json).toHaveBeenCalledWith(newUser);
		});

		it("should handle errors and return an error response", async () => {
			const username = "user1";
			const email = "testemail@email.com";
			const firstName = "testfirstname";
			const lastName = "testlastname";
			const password = "password1";
			const error = new Error("Database error");

			req.body = { username, email, firstName, lastName, password };

			(User.create as jest.Mock).mockRejectedValue(error);

			await createUser(req, res);

			expect(User.create).toHaveBeenCalledWith({
				username,
				email,
				firstName,
				lastName,
				password,
			});
			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.json).toHaveBeenCalledWith({
				error: "Internal Server Error",
			});
		});
	});

	describe("updateUser", () => {
		it("should update an existing user", async () => {
			const id = "1";
			const username = "updatedUser";
			const password = "updatedPassword";
			const updatedUser = [1];

			req.params = { id };
			req.body = { username, password };

			(User.update as jest.Mock).mockResolvedValue(updatedUser);

			await updateUser(req, res);

			expect(User.update).toHaveBeenCalledWith(
				{ username, password },
				{ where: { id } }
			);
			expect(res.json).toHaveBeenCalledWith(updatedUser);
		});

		it("should return an error if the user is not found", async () => {
			const id = "1";
			const username = "updatedUser";
			const password = "updatedPassword";

			req.params = { id };
			req.body = { username, password };

			(User.update as jest.Mock).mockResolvedValue(null);

			await updateUser(req, res);

			expect(User.update).toHaveBeenCalledWith(
				{ username, password },
				{ where: { id } }
			);
			expect(res.status).toHaveBeenCalledWith(404);
			expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
		});

		it("should handle errors and return an error response", async () => {
			const id = "1";
			const username = "updatedUser";
			const password = "updatedPassword";
			const error = new Error("Database error");

			req.params = { id };
			req.body = { username, password };

			(User.update as jest.Mock).mockRejectedValue(error);

			await updateUser(req, res);

			expect(User.update).toHaveBeenCalledWith(
				{ username, password },
				{ where: { id } }
			);
			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.json).toHaveBeenCalledWith({
				error: "Internal Server Error",
			});
		});
	});

	describe("deleteUser", () => {
		it("should delete an existing user", async () => {
			const id = "1";
			const user = { id: 1, username: "user1" };

			req.params = { id };

			(User.destroy as jest.Mock).mockResolvedValue(user);

			await deleteUser(req, res);

			expect(User.destroy).toHaveBeenCalledWith({ where: { id } });
			expect(res.sendStatus).toHaveBeenCalledWith(204);
		});

		it("should return an error if the user is not found", async () => {
			const id = "1";

			req.params = { id };

			(User.destroy as jest.Mock).mockResolvedValue(null);

			await deleteUser(req, res);

			expect(User.destroy).toHaveBeenCalledWith({ where: { id } });
			expect(res.status).toHaveBeenCalledWith(404);
			expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
		});

		it("should handle errors and return an error response", async () => {
			const id = "1";
			const error = new Error("Database error");

			req.params = { id };
			(User.destroy as jest.Mock).mockRejectedValue(error);

			await deleteUser(req, res);

			expect(User.destroy).toHaveBeenCalledWith({ where: { id } });
			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.json).toHaveBeenCalledWith({
				error: "Internal Server Error",
			});
		});
	});
});
