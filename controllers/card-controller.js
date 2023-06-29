const Card = require('../models/card');

const handleError = (res, err) => {
  res.status(500).send({ message: err.message })
}

const handleResult = (res, data) => {
  res.status(200).json(data)
}

const createCard = (req, res) => {
  console.log(req.user._id); // _id станет доступен
}

// Получить данные о всех карточках
const getCards = (req, res) => {
  Card
    .find()
    .then((cards) => handleResult(res, cards))
    .catch((err) => handleError(res, err));
}


module.exports = {
  getCards,
  createCard
}