const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Task {
  static async createTask(task) {
    try {
      const newTask = await prisma.task.create({ data: task });
      return newTask.id;
    } catch (error) {
      throw new Error('Error creating task: ' + error.message);
    }
  }

  static async getUserTasks(userId, page, limit, sortField, sortOrder) {
    try {
      const tasks = await prisma.task.findMany({ 
        where: { userId },
        orderBy: { [sortField]: sortOrder },
        skip: (page - 1) * limit,
        take: limit 
      });

      return tasks;
    } catch (error) {
      throw new Error('Error fetching user tasks: ' + error.message);
    }
  }

  static async getTaskById(taskId) {
    try {
      const task = await prisma.task.findUnique({ where: { id: taskId } });
      return task;
    } catch (error) {
      throw new Error('Error fetching task by id: ' + error.message);
    }
  }

  static async updateTask(taskId, newData) {
    try {
      await prisma.task.update({ where: { id: taskId }, data: newData });
      return true;
    } catch (error) {
      throw new Error('Error updating task: ' + error.message);
    }
  }

  static async deleteTask(taskId) {
    try {
      await prisma.task.delete({ where: { id: taskId } });
      return true;
    } catch (error) {
      throw new Error('Error deleting task: ' + error.message);
    }
  }
}

module.exports = Task;
