import express from "express";

import { authMiddleware, isAdmin } from "../middlewares/authMiddleware";
import { createFigurine } from "../controllers/adminController";
import uploadMiddleware from "../middlewares/uploadMiddleware";

const router = express.Router();

router.use(authMiddleware);
router.use(isAdmin);

router.post(
	"/figurine",
	[uploadMiddleware.uploadFileMiddleware],
	createFigurine
);

export { router as adminRoutes };
