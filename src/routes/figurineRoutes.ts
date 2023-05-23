import express from "express";
import { getAllFigurines } from "../controllers/figurineController";

const router = express.Router();

router.get("/", getAllFigurines);

export { router as figurineRoutes };
