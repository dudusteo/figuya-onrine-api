import express from "express";

import { authMiddleware, isAdmin } from "../middlewares/authMiddleware";
import { createFigurine } from "../controllers/adminController";

const router = express.Router();

router.use(authMiddleware);
router.use(isAdmin);

router.post("/figurine", createFigurine);

export { router as adminRoutes };
