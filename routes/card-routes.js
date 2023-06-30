const router = require('express').Router();

const { getCards, createCard } = require('../controllers/card-controller');

// Получить данные о всех карточках
router.get('/cards', getCards);

// Добавление данных
router.post('/cards', createCard);

module.exports = router;
