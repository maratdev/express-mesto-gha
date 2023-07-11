const Card = require('../models/card');
const { CREATED, handleError, handleResult } = require('../constants');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

// Получить данные о всех карточках
const getCards = (req, res) => {
  Card
    .find()
    .then((cards) => handleResult(res, cards))
    .catch((err) => handleError(res, err));
};

// Создаёт карточку
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const newCard = new Card({ name, link, owner: req.user._id });
  newCard
    .save()
    .then((result) => {
      res.status(CREATED).json(result);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки.'));
        return;
      }
      next(err);
    });
};

// Удаление карточки
const deleteCards = (req, res, next) => {
  Card
    .findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      } if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Невозможно удалить карточку!');
      }
      handleResult(res, card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректные данные _id'));
      }
      next(err);
    });
};

// Поставить лайк карточке
const likeCard = (req, res, next) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .then((result) => {
      if (!result) {
        throw new NotFoundError('Передан несуществующий _id карточки.');
      }
      handleResult(res, result);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для постановки/снятии лайка.'));
        return;
      }
      next(err);
    });
};

// Удалить лайк карточке
const dislikeCard = (req, res, next) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .then((result) => {
      if (!result) {
        throw new NotFoundError('Передан несуществующий _id карточки.');
      }
      handleResult(res, result);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для постановки/снятии лайка.'));
        return;
      }
      next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCards,
  likeCard,
  dislikeCard,
};
