function checkAdminRole(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access is denied. Administrator role required' });
  }
  next();
}

module.exports = checkAdminRole;