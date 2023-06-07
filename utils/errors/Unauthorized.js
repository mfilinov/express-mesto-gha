const { HTTP_STATUS_UNAUTHORIZED } = require('http2').constants;
const { UNAUTHORIZED } = require('../constants');

class Unauthorized extends Error {
  constructor(message = UNAUTHORIZED) {
    super(message);
    this.statusCode = HTTP_STATUS_UNAUTHORIZED;
  }
}

module.exports = Unauthorized;
