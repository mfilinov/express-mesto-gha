const { HTTP_STATUS_CONFLICT } = require('http2').constants;
const { CONFLICT } = require('../constants');

class ConflictError extends Error {
  constructor(message = CONFLICT) {
    super(message);
    this.statusCode = HTTP_STATUS_CONFLICT;
  }
}

module.exports = ConflictError;
