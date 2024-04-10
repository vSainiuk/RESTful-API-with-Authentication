const { throwNotFound } = require('../helpers/errorHelpers');
const User = require('../models/user.model');

async function getUsers(req, res) {
  try {
    const users = await User.getAll();

    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getUserById(req, res) {
  try {
    const userId = +req.params.id;
    const user = await User.getById(userId);

    if (!user) {
      return throwNotFound(res, 'User not found');
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


module.exports = { getUsers, getUserById };
