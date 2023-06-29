const router = require('express').Router();

const { getCards } = require('../controllers/card-controller');

// Получить данные о всех карточках
router.get('/cards', getCards)

module.exports = router;