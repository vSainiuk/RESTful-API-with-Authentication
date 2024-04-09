const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class User {
  static async createUser(user) {
    try {
      const newUser = await prisma.user.create({ data: user });
      return newUser.id;
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  }

  static async getUserByEmail(email) {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      return user;
    } catch (error) {
      throw new Error('Error fetching user by email: ' + error.message);
    }
  }

  static async getUsers() {
    try {
      const users = await prisma.user.findMany();

      return users;
    } catch (error) {
      throw new Error('Error fetching users: ' + error.message);
    }
  }
}

module.exports = User;
