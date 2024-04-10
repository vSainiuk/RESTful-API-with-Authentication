const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class User {
  static async create(user) {
    try {
      return await prisma.user.create({ data: user });
    } catch (error) {
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        throw new Error('Email address is already in use');
      }

      throw new Error('Error creating user: ' + error.message);
    }
  }

  static async getByEmail(email) {
    try {
      return await prisma.user.findUnique({ where: { email } });
    } catch (error) {
      throw new Error('Error fetching user by email: ' + error.message);
    }
  }

  static async getAll() {
    try {
      const count = await prisma.user.count();
      const users =  await prisma.user.findMany();

      return { users, countUsers: count};
    } catch (error) {
      throw new Error('Error fetching users: ' + error.message);
    }
  }

  static async getById(userId) {
    try {
      return await prisma.user.findUnique({ where: { id: userId } });
    } catch (error) {
      throw new Error('Error fetching user by id: ' + error.message);
    }
  }
}

module.exports = User;
