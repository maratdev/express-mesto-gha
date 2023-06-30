const router = require('express').Router();

const { getUsers, getUser, addUser } = require('../controllers/users-controller');

// Получить данные о всех пользователях
router.get('/users', getUsers);

// Получить данные о пользователе по id
router.get('/users/:userId', getUser);

// Добавление данных
router.post('/users', addUser);

module.exports = router;
