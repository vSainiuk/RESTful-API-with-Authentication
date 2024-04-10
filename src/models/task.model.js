const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Task {
  static async create(task) {
    try {
      return await prisma.task.create({ data: task });
    } catch (error) {
      throw new Error('Error creating task: ' + error.message);
    }
  }

  static async getAll(userId, page, sortField, limit, sortOrder) {
    try {
      const totalTasks = await prisma.task.count({ where: { userId } });

      const validSortFields = ['id', 'title', 'description', 'createdAt', 'updatedAt'];
      if (!validSortFields.includes(sortField)) {
        throw new Error(`Invalid ${sortField} field`);
      }

      const tasks = await prisma.task.findMany({ 
        where: { userId },
        orderBy: { [sortField]: sortOrder },
        skip: (page - 1) * limit,
        take: limit 
      });

      return { tasks, totalTasks };
    } catch (error) {
      throw new Error('Error fetching user tasks: ' + error.message);
    }
  }

  static async getById(userId, taskId) {
    try {
      return await prisma.task.findUnique({ where: { id: taskId, userId } });
    } catch (error) {
      throw new Error('Error fetching task by id: ' + error.message);
    }
  }

  static async update(taskId, newData) {
    try {
      return await prisma.task.update({ where: { id: taskId }, data: newData });
    } catch (error) {
      throw new Error('Error updating task: ' + error.message);
    }
  }

  static async remove(userId, taskId) {
    try {
      await prisma.task.delete({ where: { id: taskId, userId } });
      return true;
    } catch (error) {
      throw new Error('Error deleting task: ' + error.message);
    }
  }
}

module.exports = Task;
