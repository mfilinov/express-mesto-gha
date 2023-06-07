const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { UNAUTHORIZED } = require('../utils/constants');
const Unauthorized = require('../utils/errors/Unauthorized');

const userSchema = new Schema({
  name: {
    type: String,
    minlength: [2, 'Min length of name is 2 symbols'],
    maxlength: [30, 'Max length of name is 30 symbols'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Min length of name is 2 symbols'],
    maxlength: [30, 'Max length of name is 30 symbols'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Incorrect URL',
    },
  },
  email: {
    type: String,
    required: [true, 'Field avatar have to be filled'],
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Incorrect email',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Field password have to be filled'],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) return Promise.reject(new Unauthorized(UNAUTHORIZED));
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) return Promise.reject(new Unauthorized(UNAUTHORIZED));
          return user;
        });
    });
};

module.exports = model('user', userSchema);
