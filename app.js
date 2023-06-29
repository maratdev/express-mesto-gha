const express = require('express');
const mongoose = require('mongoose');
const usersRoutes  = require('./routes/users-routes');
const cardsRoutes  = require('./routes/card-routes');

const PORT = 3000;
const URL = 'mongodb://localhost:27017/mestodb';
const app = express();

app.use(express.json());
app.use(usersRoutes);
app.use(cardsRoutes);

app.use((req, res, next) => {
  req.user = {
    _id: '649df6d7bf6272a51b77f77f'
  };

  next();
});

mongoose
  .connect(URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Connected to MongoDB '))
  .catch((err) => console.log(`DB connection error: ${err}`))



app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Listen port ${PORT}`);
});