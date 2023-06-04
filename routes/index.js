const router = require('express').Router();
const { HTTP_STATUS_NOT_FOUND } = require('http2').constants;

router.use('/users', require('./users'));
router.use('/cards', require('./cards'));

router.use('*', (req, res) => res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'Resource Not Found' }));

module.exports = router;
