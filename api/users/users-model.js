const db = require('../../data/dbConfig.js');

const roles = require('../roles/roles-model.js');

module.exports = {
  createUser,
  readUsers,
  readUserById,
  readUserByName,
  readUserRolesByUserId,
  readUsersInRole,
  updateUser,
  deleteUser,
};

function createUser(user) {
  if (user) {
    if (!process.env.NO_LOGGER) console.log(`TCL: createUser -> user`, user);
    return db("users")
      .insert(user)
      .then(u => this.readUserById(u[0]));
  } else {
    return null;
  };
};

function readUsers() {
  return db("users");
};
function readUserById(id) {
  if (id) {
    return db("users")
      .where("id", id)
      .first();
  } else {
    return null;
  };
};
function readUserByName(username) {
  if (username) {
    return db("users")
      .where("username", username)
      .first();
  } else {
    return null;
  };
};
function readUserRolesByUserId(user_id) {
  if (user_id) {
    return db("users as u")
      .leftJoin("user_roles as ur", "ur.user_id", "u.id")
      .leftJoin("roles as r", "r.id", "ur.role_id")
      .select("r.*")
      .where("u.id", user_id);
  } else {
    return null;
  };
};
function readUsersInRole(role_id) {
  if (role_id) {
    return db("users as u")
      .leftJoin("user_roles as ur", "ur.user_id", "u.id")
      .leftJoin("roles as r", "r.id", "ur.role_id")
      .select("u.*")
      .where("r.id", role_id);
  } else {
    return null;
  };
};

function updateUser(id, userUpdate) {
  if (id && userUpdate) {
    return db("users")
      .update(userUpdate)
      .then(count => (count > 0 ? this.readUserById(id) : null));
  } else {
    return null;
  };
};

function deleteUser(id) {
  if (id) {
    return db("users")
      .where("id", id)
      .del();
  } else {
    return null;
  };
};