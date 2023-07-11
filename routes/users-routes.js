const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUser, updateUser, updateUserAvatar, getCurrentUser,
} = require('../controllers/users-controller');

// Получить данные о всех пользователях
router.get('/', getUsers);

// Получения информации о пользователе
router.get('/me', getCurrentUser);

// Получить данные о пользователе по id
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
}), getUser);

// Обновление данных
router.patch('/me', updateUser);

// Обновление данных avatar
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
