const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('../middleware/jwt.js');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const Users = require('../users/users-model.js');

router.post('/register', jsonParser, (req, res) => {
  let userData = req.body;
  if (!process.env.NO_LOGGER) console.log(`TCL: user`, userData);

  if (!userData.username || !userData.password || !userData.enabled) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    const hash = bcrypt.hashSync(userData.password, 12);
    if (!process.env.NO_LOGGER) console.log(`TCL: hash`, hash);
    
    userData.password = hash;

    Users.createUser(userData)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(err => {
        if (!process.env.NO_LOGGER) console.log(`TCL: err`, err);
        res.status(500).json(err);
      });
  }
});

router.post('/login', jsonParser, (req, res) => {
  let userData = req.body;
  if (!process.env.NO_LOGGER) console.log(`TCL: login -> user input`, userData);

  if (!userData.username || !userData.password) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    username = userData.username;
    Users.readUserByName(username)
      .first()
      .then(user => {
        if (!process.env.NO_LOGGER) console.log(`TCL: login -> user found\n`, user);
        if (user) {
          const b = bcrypt.compareSync(userData.password, user.password);
          if (!process.env.NO_LOGGER) console.log(`TCL: login -> b =`, b);
          if (b) {
            Users.readUserRolesByUserId(user.id)
              .then(userRoles => {
                if (userRoles) {
                  newUser = { roles: userRoles, ...user };
                  user = newUser;
                }
                const token = jwt.generateToken(user);
                if (!process.env.NO_LOGGER) {
                  console.log(`TCL: user:\n`, user);
                  console.log(`TCL: login -> token =`, token);
                };
                res.status(200).json({
                  message: `Welcome ${user.username}!`,
                  token,
                });
              });
          } else {
            res.status(401).json({ message: `Invalid Credentials` });
          };
        } else {
          res.status(404).json({ message: `Invalid User` });
        };
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
});

router.get('/logout', (req, res) => {
  if (!process.env.NO_LOGGER) console.log(`TCL: logout -> req.session\n`, req.session);
  if (req.session) {
    if (!process.env.NO_LOGGER) console.log(`TCL: logout -> has session`);
    req.session.destroy(err => {
      if (err) {
        if (!process.env.NO_LOGGER) console.log(`TCL: logout -> err`, err);
        res.status(500).json({ message: 'Unable to destroy session!' });
      } else {
        if (!process.env.NO_LOGGER) console.log(`TCL: logout -> OK`);
        res.status(200).json({ message: 'Logged out.' });
      };
    });
  } else {
    res.end();
    if (!process.env.NO_LOGGER) console.log(`TCL: logout -> end`);
  };
  if (!process.env.NO_LOGGER) console.log(`TCL: logout -> done`);
});

module.exports = router;