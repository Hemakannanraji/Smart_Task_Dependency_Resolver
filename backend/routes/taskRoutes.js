const express = require("express");
const router = express.Router();

const {
  createTask,
  getAllTasks,
  getReadyTasks,
  cleanupCompletedTasks
} = require("../controllers/taskController");

router.post("/", createTask);
router.get("/", getAllTasks);
router.get("/ready", getReadyTasks);
router.delete("/completed", cleanupCompletedTasks);

module.exports = router;
