const Task = require("../models/Task");

// ✅ CREATE TASK
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET ALL TASKS
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET READY TASKS
const getReadyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      status: "pending",
      dependencies: { $size: 0 }
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🧹 CLEANUP COMPLETED TASKS
const cleanupCompletedTasks = async (req, res) => {
  try {
    const result = await Task.deleteMany({ status: "completed" });

    res.json({
      message: "Completed tasks cleaned up",
      deletedCount: result.deletedCount
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  createTask,
  getAllTasks,
  getReadyTasks,
  cleanupCompletedTasks
};

