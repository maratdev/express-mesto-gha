const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  handleError, CREATED, BAD_REQUEST,
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
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      console.log(user._id.toString());
      const token = jwt.sign({ _id: user._id.toString() }, 'prpZUoYKk3YJ3nhemFHZ', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      handleError(res, err);
    });
};

module.exports = {
  login,
  createUser,
};
