import express from "express";
import {
  registerUser,
  getUsers,
  updateUserProfile,
  deleteUser,
  getUserProfile,
} from "../controllers/userController";
import { login, refreshToken } from "../controllers/authController";
import { verifyToken } from "../middleware/authMiddleware";
import { verifyAccessToken } from "../utils/jwt";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.put("/profile", verifyToken, updateUserProfile);
router.delete("/:id", verifyToken, deleteUser);
router.get("/me", verifyToken, getUserProfile);

export default router;
