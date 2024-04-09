const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth.middleware');
const { createTask, getUserTasks, getTaskById, updateTask, deleteTask } = require('../controllers/task.controller');

router.post('/', authenticateToken, createTask);
router.get('/', authenticateToken, getUserTasks);
router.get('/:id', authenticateToken, getTaskById);
router.put('/:id', authenticateToken, updateTask);
router.delete('/:id', authenticateToken, deleteTask);

module.exports = router;
