import express from "express";
import {
  getUsers,
  updateUserProfile,
  deleteUser,
} from "../controllers/userController";
import { adminLogin } from "../controllers/authController";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/users", getUsers);
router.delete("/users/:id", deleteUser);
router.put("/users/:id", updateUserProfile);

export default router;
