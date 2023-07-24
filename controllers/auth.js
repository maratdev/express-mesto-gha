const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const { CREATED } = require('../errors/statusCode');
const { JWT_TOKEN_EXPIRES, COOKIE_MAX_AGE } = require('../util/constants');

const {
  NODE_ENV, JWT_SECRET, COOKIE_SAMESITE, COOKIE_SECURE,
} = process.env;

// Создаёт пользователя
const createUser = (req, res, next) => {
  req.body.password = bcrypt.hashSync(req.body.password, 7);
  const {
    name, about, avatar, email, password,
  } = req.body;
  const newUser = new User({
    name, about, avatar, email, password,
  });
  newUser
    .save()
    .then((result) => {
      res.status(CREATED).json(result);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
      } else if (err.code === 11000) {
        next(new ConflictError('Такой пользователь уже существует!'));
      } else {
        next(err);
      }
    });
};

// Авторизация
const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id.toString() }, NODE_ENV === 'production' ? JWT_SECRET : 'prpZUoYKk3YJ3nhemFHZ', { expiresIn: JWT_TOKEN_EXPIRES });
      res.cookie('jwt', token, {
        maxAge: COOKIE_MAX_AGE,
        httpOnly: true,
        sameSite: NODE_ENV === 'production' ? COOKIE_SAMESITE : 'Lax',
        secure: NODE_ENV === 'production' ? COOKIE_SECURE : false,
      });
      res.send({ token });
    })
    .catch(next);
};

// Logout
const logout = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
  res.end();
};

module.exports = {
  login,
  createUser,
  logout,
};
