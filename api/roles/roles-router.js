const router = require('express').Router();

const Roles = require('./roles-model.js');

const auth = require('../middleware/auth');
const checkRole = require('../middleware/check-role');

router.post('/', auth, checkRole, (req, res) => {
  const roleData = req.body;

  if (!roleData.name) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    if (!process.env.NO_LOGGER) console.log(`TCL: createRole(roleData):\n`, roleData);
    Roles.createRole(roleData)
      .then(addedRole => {
        res.status(201).json(addedRole);
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to create new role` });
      });
  };
});

router.get('/', auth, (req, res) => {
  if (!process.env.NO_LOGGER) console.log(`TCL: readRoles()`);
  Roles.readRoles()
    .then(roles => {
      res.json(roles);
    })
    .catch(err => {
      res.status(500).json({ message: `Failed to get roles` });
    });
});
router.get('/:roleId', auth, (req, res) => {
  const { roleId } = req.params;
  roleId = parseInt(roleId, 10);
  if (roleId > 0) {
    if (!process.env.NO_LOGGER) console.log(`TCL: readRoleById(${roleId})`);
    Roles.readRoleById(roleId)
      .then(role => {
        if (role) {
          if (!process.env.NO_LOGGER) console.log(`TCL: found:\n`, role);
          res.json({ roleData: role });
        } else {
          res.status(404).json({ message: `Could not get role with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to get role` });
      });
  };
});

router.put('/:roleId', auth, checkRole, (req, res) => {
  const { roleId } = req.params;
  roleId = parseInt(roleId, 10);
  const changes = req.body;

  if (!changes.name && !changes.description) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    if (roleId > 0) {
      Roles.readRoleById(roleId)
        .then(role => {
          if (!process.env.NO_LOGGER) console.log(`TCL: updateRole(${roleId}):\n`, changes);
          Roles.updateRole(roleId, changes)
            .then(updatedRole => {
              if (updatedRole) {
                res.json({ updatedRole });
              } else {
                res.status(404).json({ message: `Could not get role with given id` });
              };
            })
        })
        .catch(err => {
          res.status(500).json({ message: `Failed to update role` });
        });
    };
  };
});

router.delete('/:roleId', auth, checkRole, (req, res) => {
  const { roleId } = req.params;
  roleId = parseInt(roleId, 10);
  if (roleId > 0) {
    if (!process.env.NO_LOGGER) console.log(`TCL: deleteRole(${roleId})`);
    Roles.deleteRole(roleId)
      .then(removedRole => {
        if (removedRole) {
          res.json({ removedRole: parseInt(removedRole, 10) });
        } else {
          res.status(404).json({ message: `Could not get role with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to delete role` });
      });
  };
});

module.exports = router;