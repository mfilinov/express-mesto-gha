const router = require('express').Router();
const { HTTP_STATUS_NOT_FOUND } = require('http2').constants;
const { login, createUser } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const { validateLogin, validateCreateUser } = require('../utils/validationApi');

router.use('/signin', validateLogin, login);
router.use('/signup', validateCreateUser, createUser);

router.use(auth);

router.use('/users', require('./users'));
router.use('/cards', require('./cards'));

router.use('*', (req, res) => res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'Resource Not Found' }));

module.exports = router;
