const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

module.exports = {
  generateToken,
};

function generateToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
    department: user.department,
  };

  const options = {
    expiresIn: '1d',
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
};
