const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const { OK, handleResult } = require('../errors/statusCode');

// Получить данные о всех пользователях
const getUsers = (req, res, next) => {
  User.find()
    .then((users) => handleResult(res, users))
    .catch(next);
};

// Получить данные о пользователе
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => handleResult(res, user))
    .catch(next);
};

// Получить данные о пользователе по userId
const getUser = (req, res, next) => {
  User
    .findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }
      handleResult(res, user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('Передан некорретный Id'));
        return;
      }
      next(err);
    });
};

// Обновление данных user
const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User
    .findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((result) => {
      if (!result) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
      res.status(OK).json(result);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля.'));
        return;
      }
      next(err);
    });
};

// Обновление данных user -> avatar
const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User
    .findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((result) => {
      if (!result) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
      res.status(OK).json(result);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении аватара.'));
        return;
      }
      next(err);
    });
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  updateUserAvatar,
  getCurrentUser,
};
