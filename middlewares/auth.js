const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Необходима авторизация!'));
  }
  // извлечём токен
  const token = authorization.replace('Bearer ', '');
  let payload;
  // верифицируем токен
  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, 'prpZUoYKk3YJ3nhemFHZ');
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация!'));
  }
  req.user = payload;

  next();
};
