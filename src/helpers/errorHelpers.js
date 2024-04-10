function throwNotFound(res, message = 'Not Found') {
  res.status(404).json({ error: message });
}

function throwUnauthorized(res, message = 'Unauthorized') {
  res.status(401).json({ error: message });
}

module.exports = { throwNotFound, throwUnauthorized };