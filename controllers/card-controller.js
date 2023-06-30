const Card = require('../models/card');

const handleError = (res, err) => {
  res.status(500).send({ message: err.message });
};

const handleResult = (res, data) => {
  res.status(200).json(data);
};

// Получить данные о всех карточках
const getCards = (req, res) => {
  Card
    .find()
    .then((cards) => handleResult(res, cards))
    .catch((err) => handleError(res, err));
};

// Создаёт карточку
const createCard = (req, res) => {
  const { name, link } = req.body;
  const newCard = new Card({ name, link, owner: req.user._id });
  newCard
    .save()
    .then((result) => {
      res
        .status(201)
        .json(result);
    })
    .catch((err) => handleError(res, err));
};

// Удаление карточки
const getDeleteCard = (req, res) => {
  Card
    .findByIdAndDelete(req.params.cardId)
    .then((result) => {
      res
        .status(200)
        .json(result);
    })
    .catch((err) => handleError(res, err));
};

// Поставить лайк карточке
const likeCard = (req, res) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .then((result) => {
      res
        .status(200)
        .json(result);
    })
    .catch((err) => handleError(res, err));
};

// Удалить лайк карточке
const dislikeCard = (req, res) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .then((result) => {
      res
        .status(200)
        .json(result);
    })
    .catch((err) => handleError(res, err));
};

module.exports = {
  getCards,
  createCard,
  getDeleteCard,
  likeCard,
  dislikeCard,
};
