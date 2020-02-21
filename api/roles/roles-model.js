const db = require('../../data/dbConfig.js');

module.exports = {
  createRole,
  readRoles,
  readRoleById,
  updateRole,
  deleteRole,
};

async function createRole(role) {
  if (role) {
    return await db("roles")
      .insert(role)
      .then(u => this.readRoleById(u[0]));
  } else {
    return null;
  };
};

async function readRoles() {
  return await db("roles");
};
async function readRoleById(id) {
  if (id) {
    return await db("roles")
      .where("id", id)
      .first();
  } else {
    return null;
  };
};

async function updateRole(id, roleUpdate) {
  if (id && roleUpdate) {
    return await db("roles")
      .update(roleUpdate)
      .then(count => (count > 0 ? this.readRoleById(id) : null));
  } else {
    return null;
  };
};

async function deleteRole(id) {
  if (id) {
    return await db("roles")
      .where("id", id)
      .del();
  } else {
    return null;
  };
};