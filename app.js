const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const { SERVER_ERROR } = require('./constants');
const router = require('./routes');
const { login, createUser } = require('./controllers/auth');
const { validationCreateUser, validationLogin } = require('./middlewares/validation');

const { PORT = 3000, DB = 'mongodb://localhost:27017/mestodb' } = process.env;
const app = express();

app.use(express.json());
app.use(cookieParser());
// Добавление данных
app.post('/signup', validationCreateUser, createUser);
app.post('/signin', validationLogin, login);

app.use(router);

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
