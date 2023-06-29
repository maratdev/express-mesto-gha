const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  avatar: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema)
module.exports = User;