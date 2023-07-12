const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Необходима авторизация! 1'));
    return;
  }
  // извлечём токен
  const token = authorization.replace('Bearer ', '');
  console.log(token);
  let payload;
  // верифицируем токен
  try {
    payload = jwt.verify(token, 'prpZUoYKk3YJ3nhemFHZ');
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация! 2'));
    return;
  }
  req.user = payload;

  next();
};
