const router = require('express').Router();

const {
  getCards, createCard, deleteCards, likeCard, dislikeCard,
} = require('../controllers/card-controller');

// Получить данные о всех карточках
router.get('/', getCards);

// Добавление данных
router.post('/', createCard);

// Удаление данных
router.delete('/:cardId', deleteCards);

// Добавить лайк
router.put('/:cardId/likes', likeCard);

// Удалить лайк
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
