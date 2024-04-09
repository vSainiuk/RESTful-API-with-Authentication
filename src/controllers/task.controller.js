const Task = require('../models/task.model');

async function createTask(req, res) {
  try {
    const { title, description } = req.body;

    const userId = req.user.id;
    const taskId = await Task.createTask({ userId, title, description });

    res.status(201).json({ taskId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getUserTasks(req, res) {
  try {
    const userId = req.user.id;
    const tasks = await Task.getUserTasks(userId);

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getTaskById(req, res) {
  try {
    const taskId = req.params.id;
    const task = await Task.getTaskById(taskId);

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateTask(req, res) {
  try {
    const taskId = req.params.id;
    const newData = req.body;
    const isUpdated = await Task.updateTask(taskId, newData);

    if (isUpdated) {
      res.json({ message: 'Task updated successfully' });
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteTask(req, res) {
  try {
    const taskId = req.params.id;
    const isDeleted = await Task.deleteTask(taskId);

    if (isDeleted) {
      res.json({ message: 'Task deleted successfully' });
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createTask, getUserTasks, getTaskById, updateTask, deleteTask };
