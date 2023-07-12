const { BAD_REQUEST } = require('./statusCode');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST;
  }
}
module.exports = BadRequestError;
