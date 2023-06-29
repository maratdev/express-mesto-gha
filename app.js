const express = require('express');
const mongoose = require('mongoose');
const usersRoutes  = require('./routes/users-routes');

const PORT = 3000;
const URL = 'mongodb://localhost:27017/mestodb';
const app = express();

app.use(express.json());
app.use(usersRoutes);

mongoose
  .connect(URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Connected to MongoDB '))
  .catch((err) => console.log(`DB connection error: ${err}`))



app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Listen port ${PORT}`);
});