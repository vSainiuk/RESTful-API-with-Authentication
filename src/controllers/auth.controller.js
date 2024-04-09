const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');
const User = require('../models/user.model');

async function register(req, res) {
  try {
    const { username, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await User.createUser({ username, email, password: hashedPassword, role });

    res.status(201).json({ userId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.getUserByEmail(email);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(401).json({ error: 'Invalid password.' });

    const token = jwt.sign({ id: user.id, email: user.email }, jwtConfig.secret, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { register, login };