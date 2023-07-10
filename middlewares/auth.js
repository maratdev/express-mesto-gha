const jwt = require('jsonwebtoken');
const { BAD_REQUEST } = require('../constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(BAD_REQUEST).send({ message: 'Необходима авторизация' });
  }
  // извлечём токен
  const token = authorization.replace('Bearer ', '');
  let payload;
  // верифицируем токен
  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, 'prpZUoYKk3YJ3nhemFHZ');
  } catch (err) {
    // отправим ошибку, если не получилось
    return res.status(BAD_REQUEST).send({ message: 'Необходима авторизация' });
  }
  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
