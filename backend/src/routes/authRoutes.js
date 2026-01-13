import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  deleteProfile
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getProfile);
router.put("/me", protect, updateProfile);
router.delete("/me", protect, deleteProfile);

export default router;
