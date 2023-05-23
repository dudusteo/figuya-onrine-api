import { Request, Response } from "express";
import { getAllFigurines } from "../../src/controllers/figurineController";
import Figurine from "../../src/models/figurine";

jest.mock("../../src/models/figurine", () => ({
	findAll: jest.fn(),
	findByPk: jest.fn(),
	create: jest.fn(),
	update: jest.fn(),
	destroy: jest.fn(),
}));

describe("figurineController", () => {
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

	describe("getAllFigurines", () => {
		it("should get all figurines", async () => {
			const figurines = [
				{
					id: 1,
					name: "figurine1",
					condition: "condition1",
					price: 1,
				},
				{
					id: 2,
					name: "figurine2",
					condition: "condition2",
					price: 2,
				},
			];

			(Figurine.findAll as jest.Mock).mockResolvedValue(figurines);

			await getAllFigurines(req, res);

			expect(Figurine.findAll).toHaveBeenCalled();
			expect(res.json).toHaveBeenCalledWith(figurines);
		});
	});
});
