const router = require('express').Router();
const { validationCreateCard, validationCardById } = require('../middlewares/validation');
const {
  getCards, createCard, deleteCards, likeCard, dislikeCard,
} = require('../controllers/card-controller');

// Получить данные о всех карточках
router.get('/', getCards);

// Добавление данных
router.post('/', validationCreateCard, createCard);

// Удаление данных
router.delete('/:cardId', validationCardById, deleteCards);

// Добавить лайк
router.put('/:cardId/likes', validationCardById, likeCard);

// Удалить лайк
router.delete('/:cardId/likes', validationCardById, dislikeCard);

module.exports = router;
