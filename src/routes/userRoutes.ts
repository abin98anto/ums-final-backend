import express from "express";
import { registerUser } from "../controllers/userController";
import { login, refreshToken } from "../controllers/authController";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
// router.put("/profile", verifyToken, updateUserProfile);
// router.delete("/:id", verifyToken, deleteUser);
// router.get("/me", verifyToken, getUserProfile);

export default router;
