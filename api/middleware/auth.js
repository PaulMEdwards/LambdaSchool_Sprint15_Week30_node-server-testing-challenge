const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

function auth(req, res, next) {
  console.log(`req.headers\n`, req.headers);

  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "You shall not pass!" });
      } else {
        req.decodedJwt = decodedToken;
        next();
      };
    });
  } else {
    res.status(401).json({ message: `Missing token.` });
  };
};

module.exports = auth;