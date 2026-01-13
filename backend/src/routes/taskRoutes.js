import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getTasks,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask
} from "../controllers/taskController.js";

const router = express.Router();

router.use(protect);

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.patch("/:id/status", updateTaskStatus);
router.delete("/:id", deleteTask);

export default router;
