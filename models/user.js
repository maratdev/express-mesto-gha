const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { IS_URL } = require('../util/constants');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (url) => IS_URL.test(url),
        message: 'Невалидная ссылка!',
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: 'Неправильный формат почты',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
);

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    const data = ret;
    delete data.password;
    return data;
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль #1')); // для отладки
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Некоректные данные почты или пароля #2'));
          }
          return user;
        });
    });
};

const User = mongoose.model('user', userSchema);
module.exports = User;
