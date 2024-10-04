import express from "express";
import {
  registerUser,
  getUsers,
  updateUserProfile,
  deleteUser,
  getUserProfile,
} from "../controllers/userController";
import { login, refreshToken, adminLogin } from "../controllers/authController";
import { verifyToken } from "../middleware/authMiddleware";
import { verifyAccessToken } from "../utils/jwt";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/users", getUsers);
router.delete("/users/:id", deleteUser);
router.put("/users/:id", updateUserProfile);

export default router;
