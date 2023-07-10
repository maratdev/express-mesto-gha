const express = require('express');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/users-routes');
const cardsRoutes = require('./routes/card-routes');
// Автризация + создание user
const { login, createUser } = require('./controllers/auth');
// Защищаем роуты
const auth = require('./middlewares/auth');

const { NOT_FOUND } = require('./constants');

const { PORT = 3000 } = process.env;
const DB = 'mongodb://localhost:27017/mestodb';
const app = express();

app.use(express.json());
// Добавление данных
app.post('/signup', auth, createUser);
app.post('/signin', login);

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

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Listen port ${PORT}`);
  }
});
