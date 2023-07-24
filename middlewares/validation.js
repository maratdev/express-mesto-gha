const { celebrate, Joi } = require('celebrate');
const { IS_URL } = require('../util/constants');
// ---------------------------------------- Users --------------------------- /
// авторизация
module.exports.validationCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(IS_URL),
  }),
});
// аутенфикация
module.exports.validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
// Получить данные о пользователе по id
module.exports.validationUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
});
// Обновление данных
module.exports.validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});
// Обновление данных avatar
module.exports.validationUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(IS_URL).required(),
  }),
});

// ---------------------------------------- Cards --------------------------- /

// создание карточки
module.exports.validationCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(IS_URL).required(),
  }),
});

module.exports.validationCardById = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});
