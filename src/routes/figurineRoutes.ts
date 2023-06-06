import express from "express";
import {
	getAllFigurines,
	getFigurineById,
} from "../controllers/figurineController";

const router = express.Router();

router.get("/", getAllFigurines);
router.get("/:id", getFigurineById);

export { router as figurineRoutes };
