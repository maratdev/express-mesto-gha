const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/errors');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Необходима авторизация! #1'));
    return;
  }
  const token = authorization.replace('Bearer ', '');
  // console.log(req.cookies.jwt);
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'prpZUoYKk3YJ3nhemFHZ');
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация! #2'));
    return;
  }
  req.user = payload;

  next();
};
