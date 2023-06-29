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

module.exports = {
  getUsers
}