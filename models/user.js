const { Schema, model } = require('mongoose');
const validator = require('validator');

const userSchema = new Schema({
  name: {
    type: String,
    minlength: [2, 'Min length of name is 2 symbols'],
    maxlength: [30, 'Max length of name is 30 symbols'],
    required: [true, 'Field name have to be filled'],
  },
  about: {
    type: String,
    minlength: [2, 'Min length of name is 2 symbols'],
    maxlength: [30, 'Max length of name is 30 symbols'],
    required: [true, 'Field about have to be filled'],
  },
  avatar: {
    type: String,
    required: [true, 'Field avatar have to be filled'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Incorrect URL',
    },
  },
});

module.exports = model('user', userSchema);
