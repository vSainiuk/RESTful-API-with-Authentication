const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class User {
  static async createUser(user) {
    try {
      return await prisma.user.create({ data: user });
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  }

  static async getUserByEmail(email) {
    try {
      return await prisma.user.findUnique({ where: { email } });
    } catch (error) {
      throw new Error('Error fetching user by email: ' + error.message);
    }
  }

  static async getUsers() {
    try {
      const count = await prisma.user.count();
      const users =  await prisma.user.findMany();

      return { users, countUsers: count};
    } catch (error) {
      throw new Error('Error fetching users: ' + error.message);
    }
  }

  static async getUserById(userId) {
    try {
      return await prisma.user.findUnique({ where: { id: userId } });
    } catch (error) {
      throw new Error('Error fetching user by id: ' + error.message);
    }
  }
}

module.exports = User;
