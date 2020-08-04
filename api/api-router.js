const router = require('express').Router();

const authRouter = require('./auth/auth-router.js');
const usersRouter = require('./users/users-router.js');
const rolesRouter = require('./roles/roles-router.js');

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/roles', rolesRouter);

router.get('/', (req, res) => {
  res.sendStatus(204);  //No Content
});

module.exports = router;