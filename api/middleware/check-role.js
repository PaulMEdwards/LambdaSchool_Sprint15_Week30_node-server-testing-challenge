module.exports = (roleQuery) => {
  return function (req, res, next) {
    if (req.decodedJwt.department && roleQuery.includes(req.decodedJwt.department)) {
      next();
    } else {
      res.status(403).json({ message: "You don't have permission." });
    };
  };
};