const router = require('express').Router();

const {
  getUsers, getUser, addUser, updateUser,
} = require('../controllers/users-controller');

// Получить данные о всех пользователях
router.get('/users', getUsers);

// Получить данные о пользователе по id
router.get('/users/:userId', getUser);

// Добавление данных
router.post('/users', addUser);

// Обновление данных
router.patch('/users/me', updateUser);

module.exports = router;
