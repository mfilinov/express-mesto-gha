const { HTTP_STATUS_NOT_FOUND } = require('http2').constants;
const { NOT_FOUND } = require('../constants');

class NotFoundError extends Error {
  constructor(message = NOT_FOUND) {
    super(message);
    this.statusCode = HTTP_STATUS_NOT_FOUND;
  }
}

module.exports = NotFoundError;
