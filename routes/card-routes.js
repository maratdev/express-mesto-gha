const router = require('express').Router();

const { getCards, createCard, getDeleteCard } = require('../controllers/card-controller');

// Получить данные о всех карточках
router.get('/cards', getCards);

// Добавление данных
router.post('/cards', createCard);

// Удаление данных
router.delete('/cards/:cardId', getDeleteCard);

module.exports = router;
