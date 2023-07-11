const router = require('express').Router();
const { validationUserId, validationUpdateUser, validationUpdateAvatar } = require('../middlewares/validation');
const {
  getUsers, getUser, updateUser, updateUserAvatar, getCurrentUser,
} = require('../controllers/users-controller');

// Получить данные о всех пользователях
router.get('/', getUsers);

// Получения информации о пользователе
router.get('/me', getCurrentUser);

// Получить данные о пользователе по id
router.get('/:userId', validationUserId, getUser);

// Обновление данных
router.patch('/me', validationUpdateUser, updateUser);

// Обновление данных avatar
router.patch('/me/avatar', validationUpdateAvatar, updateUserAvatar);

module.exports = router;
