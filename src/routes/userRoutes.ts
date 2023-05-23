import express from "express";
import {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
} from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.use(authMiddleware); // Apply authentication middleware to all routes below this line

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export { router as userRoutes };
