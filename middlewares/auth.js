const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');
const Unauthorized = require('../utils/errors/Unauthorized');

// eslint-disable-next-line consistent-return
module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) return next(new Unauthorized());

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new Unauthorized());
  }
  req.user = payload;
  next();
};
