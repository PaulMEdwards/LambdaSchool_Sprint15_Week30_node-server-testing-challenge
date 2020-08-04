const db = require('../../data/dbConfig.js');

module.exports = {
  createUserRole,
  deleteUserRole,
};

async function createUserRole(userId, roleId) {
  if (userId && roleId) {
    const ur = { user_id: userId, role_id: roleId };
    return await db("user_roles")
      .insert(ur)
      .then(ur => ur[0]);
  } else {
    return null;
  };
};

async function deleteUserRole(userId, roleId) {
  if (userId && roleId) {
    return await db("user_roles")
      .where("user_id", userId)
      .andWhere("role_id", roleId)
      .del();
  } else {
    return null;
  };
};