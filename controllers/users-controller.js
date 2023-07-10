const User = require('../models/user');

const {
  BAD_REQUEST, NOT_FOUND, SERVER_ERROR, OK, handleResult, handleError,
} = require('../constants');

// Получить данные о всех пользователях
const getUsers = (req, res) => {
  User.find()
    .then((users) => handleResult(res, users))
    .catch((err) => handleError(res, err));
};

// Получить данные о всех пользователях
const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => handleResult(res, user))
    .catch((err) => handleError(res, err));
};

// Получить данные о пользователе по userId
const getUser = (req, res) => {
  console.log(req.params.userId);
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
        return res.status(BAD_REQUEST).send({ message: 'Получение пользователя с некорректным id.--' });
      }
      handleError(res, err);
    });
};

// Обновление данных user
const updateUser = (req, res) => {
  const { name, about } = req.body;
  User
    .findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((result) => {
      if (!result) {
        return res.status(NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден.' });
      }
      res.status(OK).json(result);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      }
      handleError(res, err);
    });
};

// Обновление данных user -> avatar
const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User
    .findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((result) => {
      if (!result) {
        return res.status(NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден.' });
      }
      res.status(OK).json(result);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
      }
      handleError(res, err);
    });
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  updateUserAvatar,
  getCurrentUser,
};
