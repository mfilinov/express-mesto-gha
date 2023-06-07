const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const { validateLogin, validateCreateUser } = require('../utils/validationApi');
const NotFoundError = require('../utils/errors/NotFound');

router.use('/signin', validateLogin, login);
router.use('/signup', validateCreateUser, createUser);

router.use(auth);

router.use('/users', require('./users'));
router.use('/cards', require('./cards'));

router.use('*', (req, res, next) => next(new NotFoundError()));

module.exports = router;
