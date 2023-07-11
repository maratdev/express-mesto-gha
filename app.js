const express = require('express');
const mongoose = require('mongoose');
const { errors, celebrate, Joi } = require('celebrate');
const cookieParser = require('cookie-parser');
const usersRoutes = require('./routes/users-routes');
const cardsRoutes = require('./routes/card-routes');
// Автризация + создание user
const { login, createUser } = require('./controllers/auth');
// Защищаем роуты
const auth = require('./middlewares/auth');

const { NOT_FOUND, SERVER_ERROR } = require('./constants');

const { PORT = 3000 } = process.env;
const DB = 'mongodb://localhost:27017/mestodb';
const app = express();

app.use(express.json());
app.use(cookieParser());
// Добавление данных
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^(https?):\/\/[^\s$.?#].[^\s]*$/),
  }),
}), auth, createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
  }),
}), login);

app.use('/users', auth, usersRoutes);
app.use('/cards', auth, cardsRoutes);

app.use('/*', (req, res, next) => {
  res.status(NOT_FOUND).send({ message: 'Страница не найдена.' });
  next();
});

mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✔ Connected to MongoDB '))
  .catch((err) => console.log(`✖ DB connection error: ${err}`));

// здесь обрабатываем все ошибки
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = SERVER_ERROR, message } = err;

  res.status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === SERVER_ERROR
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Listen port ${PORT}`);
  }
});
