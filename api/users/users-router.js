const router = require('express').Router();

const Users = require('./users-model.js');

const auth = require('../middleware/auth');
const checkRole = require('../middleware/check-role');

router.post('/', auth, (req, res) => {
  const userData = req.body;

  if (!userData.username || !userData.password) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    Users.createUser(userData)
      .then(addedUser => {
        res.status(201).json(addedUser);
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to create new user` });
      });
  };
});

router.get('/:userRef', auth, (req, res) => {
  const { userRef } = req.params;
  userId = parseInt(userRef, 10);
  if (userId > 0) {
    console.log(`TCL: readUserById(${userId})`);
    Users.readUserById(userId)
      .then(user => {
        if (user) {
          console.log(`TCL: found:\n`, user);
          res.json({ userData: user });
        } else {
          res.status(404).json({ message: `Could not get user with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to get user` });
      });
  } else {
    username = userRef;
    console.log(`TCL: readUserByName(${username})`);
    Users.readUserByName(username)
      .then(user => {
        if (user) {
          console.log(`TCL: found:\n`, user);
          res.json({ userData: user });
        } else {
          res.status(404).json({ message: `Could not get user with given name` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to get user` });
      });
  };
});
router.get('/all', auth, checkRole(['Administrator']), (req, res) => {
  Users.readUsers()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ message: `Failed to get users` });
    });
});
router.get('/', auth, (req, res) => {
  Users.readUsersInRole(req.decodedJwt.role)
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ message: `Failed to get users` });
    });
});
router.get('/:userId/roles', auth, checkRole(['Administrator']), (req, res) => {
  const { userId } = req.params;
  userId = parseInt(userId, 10);
  if (userId > 0) {
    console.log(`TCL: readUserRolesByUserId(${userId})`);
    Users.readUserRolesByUserId(userId)
      .then(roles => {
        if (roles) {
          console.log(`TCL: found:\n`, roles);
          res.json({ userRoles: roles });
        } else {
          res.status(404).json({ message: `Could not get user with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to get user` });
      });
  };
});

router.put('/:userId/username', auth, checkRole(['Administrator']), (req, res) => {
  const { userId } = req.params;
  userId = parseInt(userId, 10);
  const changes = req.body;

  if (!changes.username) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    if (userId > 0) {
      Users.readUserById(userId)
        .then(user => {
          console.log(`TCL: updateUser(${userId})`);
          Users.updateUser(userId, changes)
            .then(updatedUser => {
              if (updatedUser) {
                res.json({ updatedUser });
              } else {
                res.status(404).json({ message: `Could not get user with given id` });
              };
            })
        })
        .catch(err => {
          res.status(500).json({ message: `Failed to update username` });
        });
    };
  };
});
router.put('/:userId/email', auth, (req, res) => {
  const { userId } = req.params;
  userId = parseInt(userId, 10);
  const changes = req.body;

  if (!changes.email) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    if (userId > 0) {
      Users.readUserById(userId)
        .then(user => {
          console.log(`TCL: updateUser(${userId})`);
          Users.updateUser(userId, changes)
            .then(updatedUser => {
              if (updatedUser) {
                res.json({ updatedUser });
              } else {
                res.status(404).json({ message: `Could not get user with given id` });
              };
            })
        })
        .catch(err => {
          res.status(500).json({ message: `Failed to update user email` });
        });
    };
  };
});
router.put('/:userId/password', auth, (req, res) => {
  const { userId } = req.params;
  userId = parseInt(userId, 10);
  const changes = req.body;

  if (!changes.password) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    if (userId > 0) {
      Users.readUserById(userId)
        .then(user => {
          console.log(`TCL: updateUser(${userId})`);
          Users.updateUser(userId, changes)
            .then(updatedUser => {
              if (updatedUser) {
                res.json({ updatedUser });
              } else {
                res.status(404).json({ message: `Could not get user with given id` });
              };
            })
        })
        .catch(err => {
          res.status(500).json({ message: `Failed to update user password` });
        });
    };
  };
});

router.delete('/:userId', auth, checkRole(['Administrator']), (req, res) => {
  const { userId } = req.params;
  userId = parseInt(userId, 10);
  if (userId > 0) {
    console.log(`TCL: deleteUser(${userId})`);
    Users.deleteUser(userId)
      .then(removedUser => {
        if (removedUser) {
          res.json({ removedUser: parseInt(removedUser, 10) });
        } else {
          res.status(404).json({ message: `Could not get user with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to delete user` });
      });
  };
});

module.exports = router;