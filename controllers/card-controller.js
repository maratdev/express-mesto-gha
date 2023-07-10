const Card = require('../models/card');
const {
  BAD_REQUEST, NOT_FOUND, SERVER_ERROR, OK, CREATED,
} = require('../constants');

const handleError = (res, err) => {
  res.status(SERVER_ERROR).send({ message: `Произошла ошибка: ${err.message}` });
};

const handleResult = (res, data) => {
  res.status(OK).json(data);
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
      res.status(CREATED).json(result);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании карточки.' });
      }
      handleError(res, err);
    });
};

// Удаление карточки
const deleteCards = (req, res) => {
  Card
    .findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND).send({ message: 'Карточка с указанным _id не найдена.' });
      } if (card.owner.toString() !== req.user._id) {
        return res.status(BAD_REQUEST).send({ message: 'Невозможно удалить карточку!' });
      }
      handleResult(res, card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при удалении карточки.' });
      }
      handleError(res, err);
    });
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
      if (!result) {
        return res.status(NOT_FOUND).send({ message: 'Передан несуществующий _id карточки.' });
      }
      handleResult(res, result);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные для постановки/снятии лайка.' });
      }
      handleError(res, err);
    });
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
      if (!result) {
        return res.status(NOT_FOUND).send({ message: 'Передан несуществующий _id карточки.' });
      }
      handleResult(res, result);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные для постановки/снятии лайка.' });
      }
      handleError(res, err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCards,
  likeCard,
  dislikeCard,
};
