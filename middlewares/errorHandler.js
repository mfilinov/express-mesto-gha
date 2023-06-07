const { HTTP_STATUS_INTERNAL_SERVER_ERROR } = require('http2').constants;
const { INTERNAL_SERVER_ERROR } = require('../utils/constants');

module.exports = ((err, req, res, next) => {
  const { statusCode = HTTP_STATUS_INTERNAL_SERVER_ERROR, message } = err;
  if (statusCode === HTTP_STATUS_INTERNAL_SERVER_ERROR) {
    console.log(HTTP_STATUS_INTERNAL_SERVER_ERROR, err.message);
  }
  res.status(statusCode).send({
    message: statusCode === HTTP_STATUS_INTERNAL_SERVER_ERROR ? INTERNAL_SERVER_ERROR : message,
  });

  next();
});
