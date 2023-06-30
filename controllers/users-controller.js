const User = require('../models/user');

const handleError = (res, err) => {
  res.status(500).send({ message: err.message });
};

const handleResult = (res, data) => {
  res.status(200).json(data);
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
    .then((user) => handleResult(res, user))
    .catch((err) => handleError(res, err));
};

// Создаёт пользователя
const addUser = (req, res) => {
  const newUser = new User(req.body);
  newUser
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => handleError(res, err));
};

// Обновление данных user
const updateUser = (req, res) => {
  User
    .findByIdAndUpdate(req.user._id, req.body)
    .then((result) => {
      res
        .status(200)
        .json(result);
    })
    .catch((err) => handleError(res, err));
};

// Обновление данных user -> avatar
const updateUserAvatar = (req, res) => {
  User
    .findByIdAndUpdate(req.user._id, req.body)
    .then((result) => {
      res
        .status(200)
        .json(result);
    })
    .catch((err) => handleError(res, err));
};

module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  updateUserAvatar,
};
