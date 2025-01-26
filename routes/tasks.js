const express = require("express");
const { getTasks, createTask, updateTask, markTaskComplete, deleteTask, searchTasks } = require("../controllers/tasksController");
const validationMiddleware = require("../middleware/validation");
const { taskSchema, updateTaskSchema } = require("../schemas/taskSchemas.js");

const router = express.Router();

// Routes
router.get("/", getTasks);
router.post("/", validationMiddleware(taskSchema, "body"), createTask);
router.put("/:id", validationMiddleware(updateTaskSchema, "body"), updateTask);
router.put("/:id/complete", markTaskComplete);
router.delete("/:id", deleteTask);
router.get("/search", searchTasks);

module.exports = router;