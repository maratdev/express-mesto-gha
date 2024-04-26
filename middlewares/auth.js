const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(req);
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'prpZUoYKk3YJ3nhemFHZ');
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация #3'));
  }
  req.user = payload;

  return next();
};
