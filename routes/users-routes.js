const router = require('express').Router();

const {
  getUsers, getUser, updateUser, updateUserAvatar, getCurrentUser,
} = require('../controllers/users-controller');

// Получить данные о всех пользователях
router.get('/users', getUsers);

// Получения информации о пользователе
router.get('/users/me', getCurrentUser);

// Получить данные о пользователе по id
router.get('/users/:userId', getUser);

// Обновление данных
router.patch('/users/me', updateUser);

// Обновление данных avatar
router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
