import express from "express";
import { registerUser } from "../controllers/userController";
import { login, refreshToken } from "../controllers/authController";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", login);
router.post("/refresh-token", refreshToken);

export default router;
