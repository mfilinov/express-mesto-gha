const mongoose = require('mongoose');
const {
  HTTP_STATUS_CREATED,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
} = require('http2').constants;
const User = require('../models/user');
const { INTERNAL_SERVER_ERROR } = require('../utils/constants');

const { ValidationError, CastError } = mongoose.Error;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: INTERNAL_SERVER_ERROR });
      console.log(HTTP_STATUS_INTERNAL_SERVER_ERROR, err.message);
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error('InvalidId'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof CastError) {
        res.status(HTTP_STATUS_BAD_REQUEST).send({ message: `User id=${req.params.userId} is incorrect` });
      } else if (err.message === 'InvalidId') {
        res.status(HTTP_STATUS_NOT_FOUND).send({ message: `User with id=${req.params.userId} not found` });
      } else {
        res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: INTERNAL_SERVER_ERROR });
        console.log(HTTP_STATUS_INTERNAL_SERVER_ERROR, err.message);
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(HTTP_STATUS_CREATED).send({ data: user }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        res.status(HTTP_STATUS_BAD_REQUEST).send({ message: err.message });
      } else {
        res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: INTERNAL_SERVER_ERROR });
        console.log(HTTP_STATUS_INTERNAL_SERVER_ERROR, err.message);
      }
    });
};

const updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: INTERNAL_SERVER_ERROR });
      console.log(HTTP_STATUS_INTERNAL_SERVER_ERROR, err.message);
    });
};

const updateUserBio = (func) => func;
const updateUserAvatar = (func) => func;

module.exports.updateUserBio = updateUserBio(updateUser);
module.exports.updateUserAvatar = updateUserAvatar(updateUser);
