import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending"
    },
    due_date: { type: Date, required: true },
    created_at: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
