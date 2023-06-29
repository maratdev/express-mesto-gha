const router = require('express').Router();

const { getUsers } = require('../controllers/users-controller');

// Получить данные о всех пользователях
router.get('/users', getUsers)

module.exports = router;