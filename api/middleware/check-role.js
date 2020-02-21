const permittedRoles = [
  'Administrator',
  'Executive',
  'Legal',
];

function checkRole(req, res, next) {
  console.log(`TCL: check-role`);
  const userRoles = req.decodedJwt.roles;
  if (userRoles) {
    let r = []; userRoles.forEach(role => r.push(role.name));
    const intersection = permittedRoles.filter(x => r.includes(x));
    if (!process.env.NO_LOGGER) {
      console.log(`TCL: check-role -> roleQuery   `, permittedRoles);
      console.log(`TCL: check-role -> user roles  `, r);
      console.log(`TCL: check-role -> intersection`, intersection);
    };
    if (intersection.length > 0) {
      next();
    } else {
      res.status(403).json({ message: "You don't have permission." });
    };
  } else {
    res.status(500).json({ message: `Error checking roles!\nroleQuery: ${permittedRoles}, roles: ${userRoles}` });
  };
};

module.exports = checkRole;