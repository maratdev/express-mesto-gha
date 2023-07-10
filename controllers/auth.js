const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  handleError, CREATED, BAD_REQUEST, OK,
} = require('../constants');

// Создаёт пользователя
const createUser = (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 7);
  const newUser = new User(req.body);
  newUser
    .save()
    .then((result) => {
      res.status(CREATED).json(result);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      }
      handleError(res, err);
    });
};

// Авторизация
const login = (req, res) => {
  const { email } = req.body;
  User
    .findOne({ email })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'EQAtwCyHX5iNV3xfRfoy', { expiresIn: '7d' });
      res.status(OK).send({ token });
    })
    .then((matched) => {
      if (!matched) {
        return Promise.reject(new Error('Неправильные почта или пароль 2'));
      }
      // аутентификация успешна
      res.send({ message: 'Всё верно!' });
    })
    .catch((err) => {
      handleError(res, err);
    });
};

module.exports = {
  login,
  createUser,
};
