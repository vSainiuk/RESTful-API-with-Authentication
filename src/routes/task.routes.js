const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth.middleware');
const checkAdminRole = require('../middleware/admin.middleware');
const { createTask, getUserTasks, getTaskById, updateTask, deleteTask } = require('../controllers/task.controller');

router.post('/', authenticateToken, checkAdminRole, createTask);
router.get('/', authenticateToken, getUserTasks);
router.get('/:id', authenticateToken, getTaskById);
router.put('/:id', authenticateToken, checkAdminRole, updateTask);
router.delete('/:id', authenticateToken, checkAdminRole, deleteTask);

module.exports = router;
