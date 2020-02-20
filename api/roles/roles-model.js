const db = require('../../data/dbConfig.js');

module.exports = {
  createRole,
  readRoles,
  readRoleById,
  updateRole,
  deleteRole,
};

function createRole(role) {
  if (role) {
    return db("roles")
      .insert(role)
      .then(u => this.readRoleById(u[0]));
  } else {
    return null;
  };
};

function readRoles() {
  return db("roles");
};
function readRoleById(id) {
  if (id) {
    return db("roles")
      .where("id", id)
      .first();
  } else {
    return null;
  };
};

function updateRole(id, roleUpdate) {
  if (id && roleUpdate) {
    return db("roles")
      .update(roleUpdate)
      .then(count => (count > 0 ? this.readRoleById(id) : null));
  } else {
    return null;
  };
};

function deleteRole(id) {
  if (id) {
    return db("roles")
      .where("id", id)
      .del();
  } else {
    return null;
  };
};