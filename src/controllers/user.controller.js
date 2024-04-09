const User = require('../models/user.model');

async function getUsers(req, res) {
  try {
    const users = await User.getUsers();

    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


module.exports = { getUsers };
