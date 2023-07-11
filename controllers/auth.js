const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  handleError, CREATED, BAD_REQUEST,
} = require('../constants');

// Создаёт пользователя
const createUser = (req, res) => {
  console.log(`куки ${req.cookies.jwt}`);
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
const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id.toString() }, 'prpZUoYKk3YJ3nhemFHZ', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
      });
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  login,
  createUser,
};
