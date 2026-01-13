import Task from "../models/Task.js";

// GET /api/tasks?status=pending
export const getTasks = async (req, res) => {
  try {
    const query = { user: req.user._id };
    if (req.query.status) {
      query.status = req.query.status;
    }
    const tasks = await Task.find(query).sort({ created_at: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/tasks
export const createTask = async (req, res) => {
  try {
    const { title, description, status, due_date } = req.body;

    if (!title || !due_date) {
      return res
        .status(400)
        .json({ message: "Title and due_date are required" });
    }

    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      status: status || "pending",
      due_date
    });

    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/tasks/:id
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const { title, description, status, due_date } = req.body;

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    if (due_date !== undefined) task.due_date = due_date;

    const updated = await task.save();
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// PATCH /api/tasks/:id/status
export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.status = status;
    const updated = await task.save();
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/tasks/:id
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.deleteOne();
    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
