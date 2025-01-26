const Task = require("../models/task");
const { Op } = require("sequelize");
const { calculateStatus } = require("../helpers/helper");

// Get all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    const updatedTasks = tasks.map(task => ({
      ...task.toJSON(),
      status: calculateStatus(task)
    }));
    res.status(200).json(updatedTasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new task
const createTask = async (req, res) => {
  const { title, description, due_date } = req.body;
  const dueDate = due_date || new Date(new Date().setDate(new Date().getDate() + 7));

  try {
    const task = await Task.create({ title, description, due_date: dueDate });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update task
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, due_date } = req.body;

  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    const previousValues = {};
    const updatedFields = {};

    // Compare each field and store the previous value if it is being updated
    if (title && title !== task.title) {
      previousValues.title = task.title;
      updatedFields.title = title;
    }

    if (description && description !== task.description) {
      previousValues.description = task.description;
      updatedFields.description = description;
    }

    if (due_date && due_date !== task.due_date) {
      previousValues.due_date = task.due_date;
      updatedFields.due_date = due_date;
    }

    console.log(previousValues);
    await task.update(updatedFields);

    res.status(200).json({ updated: task, previous: previousValues });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mark task as completed
const markTaskComplete = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    await task.update({
      status: "Completed",
      completed_at: new Date(),
    });

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    await task.destroy();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search tasks
const searchTasks = async (req, res) => {
  const{ keyword } = req.query;
  try {
    const tasks = await Task.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${keyword}%` } },
          { description: { [Op.iLike]: `%${keyword}%` } },
        ],
      },
    });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  markTaskComplete,
  deleteTask,
  searchTasks,
};
