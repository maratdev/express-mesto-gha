const express = require('express');
const mongoose = require('mongoose');

const PORT = 3000;
const URL = 'mongodb://localhost:27017/mestodb';

const app = express();

mongoose
  .connect(URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Connected to MongoDB '))
  .catch((err) => console.log(`DB connection error: ${err}`))


app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Listen port ${PORT}`);
});