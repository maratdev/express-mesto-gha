const router = require('express').Router();

const {
  getCards, createCard, getDeleteCard, likeCard, dislikeCard,
} = require('../controllers/card-controller');

// Получить данные о всех карточках
router.get('/cards', getCards);

// Добавление данных
router.post('/cards', createCard);

// Удаление данных
router.delete('/cards/:cardId', getDeleteCard);

// Добавить лайк
router.put('/cards/:cardId/likes', likeCard);

// Удалить лайк
router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;
