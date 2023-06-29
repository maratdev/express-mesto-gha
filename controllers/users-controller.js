const User = require('../models/user');

// Получить данные о всех пользователях
const getUsers = (req, res) => {
  User
    .find()
    .then((users) => {
      res
        .status(200)
        .json(users)
    })
    .catch(err => res.status(500).send({ message: err.message }));
}

// Получить данные о пользователе по userId
const getUser = (req, res)=> {
  User
    .findById(req.params.userId)
    .then((movie) => {
      res
        .status(200)
        .json(movie);
    })
    .catch(err => res.status(500).send({ message: err.message }));

}

// Создаёт пользователя
const addUser = (req, res) => {
  const user = new User(req.body)
  user
    .save()
    .then((result) => {
      res
        .status(201)
        .json(result);
    })
    .catch(err => res.status(500).send({ message: err.message }));
}

module.exports = {
  getUsers,
  getUser,
  addUser
}