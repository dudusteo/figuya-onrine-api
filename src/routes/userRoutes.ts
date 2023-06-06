import express from "express";
import {
	getAllUsers,
	getCurrentUser,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
} from "../controllers/userController";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware";

const router = express.Router();

router.use(authMiddleware); // Apply authentication middleware to all routes below this line

router.get("/me", getCurrentUser);

router.use(isAdmin);

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export { router as userRoutes };
