require('dotenv').config();
const helmet = require('helmet');
const express = require('express');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const router = require('./routes');
const { TIME_LIMIT, MAX_LIMIT } = require('./util/constants');
const { login, createUser, logout } = require('./controllers/auth');
const { validationCreateUser, validationLogin } = require('./middlewares/validation');
const { serverLog } = require('./middlewares/serverlog');

const { PORT = 3000, DB = 'mongodb://localhost:27017/mestodb' } = process.env;
const app = express();
app.use(helmet());
const limiter = rateLimit({
  windowMs: TIME_LIMIT,
  max: MAX_LIMIT,
});
app.use(limiter);

app.use(express.json());
app.use(cookieParser());
// Добавление данных
app.post('/signup', validationCreateUser, createUser);
app.post('/signin', validationLogin, login);
app.get('/signout', logout);

app.use(router);

mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✔ Connected to MongoDB '))
  .catch((err) => console.log(`✖ DB connection error: ${err}`));

// здесь обрабатываем все ошибки
app.use(errors());
app.use(serverLog);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Listen port ${PORT}`);
  }
});
