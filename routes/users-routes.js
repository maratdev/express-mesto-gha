const router = require('express').Router();

const {
  getUsers, getUser, updateUser, updateUserAvatar, getCurrentUser,
} = require('../controllers/users-controller');

// Получить данные о всех пользователях
router.get('/', getUsers);

// Получения информации о пользователе
router.get('/me', getCurrentUser);

// Получить данные о пользователе по id
router.get('/:userId', getUser);

// Обновление данных
router.patch('/me', updateUser);

// Обновление данных avatar
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
