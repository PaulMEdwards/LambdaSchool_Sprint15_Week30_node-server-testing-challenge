const router = require('express').Router();

const UserRoles = require('./user-roles-model.js');

const auth = require('../middleware/auth');
const checkRole = require('../middleware/check-role');

router.post('/', auth, checkRole, (req, res) => {
  const userRoleData = req.body;

  if (!userRoleData.user_id || !userRoleData.role_id) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    if (!process.env.NO_LOGGER) console.log(`TCL: createRole(roleData):\n`, userRoleData);
    UserRoles.createUserRole(userRoleData)
      .then(addedUserRole => {
        res.status(201).json(addedUserRole);
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to create new user role` });
      });
  };
});

router.delete('/:userId/:roleId', auth, checkRole, (req, res) => {
  const { userId, roleId } = req.params;
  userId = parseInt(userId, 10);
  roleId = parseInt(roleId, 10);

  if (userId > 0 && roleId > 0) {
    if (!process.env.NO_LOGGER) console.log(`TCL: deleteUserRole(${userId},${roleId})`);
    UserRoles.deleteUserRole(userId, roleId)
      .then(removedUserRole => {
        if (removedUserRole) {
          res.json({ removedUserRole: parseInt(removedUserRole, 10) });
        } else {
          res.status(404).json({ message: `Could not get user role with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to delete user role` });
      });
  };
});

module.exports = router;