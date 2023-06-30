const User = require('../models/user');

const ERROR_CODE = 400;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;
const OK = 200;
const SUCCESS = 201;

const handleError = (res, err) => {
  res.status(SERVER_ERROR).send({ message: `Произошла ошибка: ${err.message}` });
};

const handleResult = (res, data) => {
  res.status(OK).json(data);
};

// Получить данные о всех пользователях
const getUsers = (req, res) => {
  User.find()
    .then((users) => handleResult(res, users))
    .catch((err) => handleError(res, err));
};

// Получить данные о пользователе по userId
const getUser = (req, res) => {
  User
    .findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: 'Пользователь с указанным _id не найдена.' });
      }
      handleResult(res, user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE).send({ message: 'Получение пользователя с некорректным id.' });
      }
      handleError(res, err);
    });
};

// Создаёт пользователя
const addUser = (req, res) => {
  const newUser = new User(req.body);
  newUser
    .save()
    .then((result) => {
      res.status(OK).json(result);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные' });
      }
      handleError(res, err);
    });
};

// Обновление данных user
const updateUser = (req, res) => {
  User
    .findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((result) => {
      if (!result) {
        return res.status(404).send({ message: 'Пользователь по указанному _id не найден.' });
      }
      res.status(OK).json(result);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      }
      handleError(res, err);
    });
};

// Обновление данных user -> avatar
const updateUserAvatar = (req, res) => {
  User
    .findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((result) => {
      if (!result) {
        return res.status(404).send({ message: 'Пользователь по указанному _id не найден.' });
      }
      res.status(OK).json(result);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
      }
      handleError(res, err);
    });
};

module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  updateUserAvatar,
};
