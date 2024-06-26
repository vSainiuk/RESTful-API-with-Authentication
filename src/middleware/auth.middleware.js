const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) return res.status(401).send('Access denied. No token provided.');

  jwt.verify(token, jwtConfig.secret, (err, user) => {
    if (err) return res.status(403).send('Invalid token.');
  
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
