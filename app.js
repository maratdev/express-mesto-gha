const express = require('express');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/users-routes');
const cardsRoutes = require('./routes/card-routes');
const { NOT_FOUND } = require('./constants');

const { PORT = 3000 } = process.env;
const URL = 'mongodb://localhost:27017/mestodb';
const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '649df6d7bf6272a51b77f77f',
  };

  next();
});

app.use(express.json());
app.use(usersRoutes);
app.use(cardsRoutes);

app.use('/*', (req, res, next) => {
  res.status(NOT_FOUND).send({ message: 'Страница не найдена.' });
  next();
});

mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB '))
  .catch((err) => console.log(`DB connection error: ${err}`));

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Listen port ${PORT}`);
  }
});
