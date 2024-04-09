const Task = require('../models/task.model');

async function createTask(req, res) {
  try {
    const { title, description } = req.body;

    const userId = req.user.id;
    const createdTask = await Task.createTask({ userId, title, description });

    res.status(201).json({ createdTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getUserTasks(req, res) {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10, sortField = 'createdAt', sortOrder = 'desc' } = req.query;
    const tasks = await Task.getUserTasks(userId, page, sortField, limit, sortOrder);

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getTaskById(req, res) {
  try {
    const userId = req.user.id;
    const taskId = +req.params.id;
    const task = await Task.getTaskById(userId, taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateTask(req, res) {
  try {
    const taskId = +req.params.id;
    const newData = req.body;
    const updatedTask = await Task.updateTask(taskId, newData);

    if (updatedTask) {
      res.json(updatedTask);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteTask(req, res) {
  try {
    const userId = req.user.id;
    const taskId = +req.params.id;
    const isDeleted = await Task.deleteTask(userId, taskId);

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
