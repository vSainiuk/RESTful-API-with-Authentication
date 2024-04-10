const jwt = require('jsonwebtoken');
const validator = require('validator');
const jwtConfig = require('../config/jwt.config');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { throwNotFound } = require('../helpers/errorHelpers');

const bcryptRounds = 10;
const expiresTokenIn = '1h';

async function register(req, res) {
  try {
    const { username, email, password, role } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    const hashedPassword = await bcrypt.hash(password, bcryptRounds);
    const user = await User.create({ username, email, password: hashedPassword, role });

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' })
    };

    const user = await User.getByEmail(email);
    if (!user) return throwNotFound(res, 'User not found');

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(401).json({ error: 'Invalid password.' });

    const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role }, 
    jwtConfig.secret, 
    { expiresIn: expiresTokenIn });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { register, login };