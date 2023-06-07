const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { HTTP_STATUS_CREATED } = require('http2').constants;
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../utils/config');
const NotFoundError = require('../utils/errors/NotFound');
const BadRequestError = require('../utils/errors/BadRequest');
const ConflictError = require('../utils/errors/Conflict');

const { ValidationError } = mongoose.Error;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => next(err));
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send({ data: user }))
    .catch((err) => next(err));
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new NotFoundError(`User with id=${req.params.userId} not found`))
    .then((user) => res.send({ data: user }))
    .catch((err) => next(err));
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      })
        .then(() => res.status(HTTP_STATUS_CREATED).send({
          data: {
            name, about, avatar, email,
          },
        }))
        .catch((err) => {
          if (err instanceof ValidationError) {
            next(new BadRequestError({ message: err.message }));
          } else if (err.code === 11000) {
            next(new ConflictError(`User ${email} already exists`));
          } else {
            next(err);
          }
        });
    });
};

module.exports.updateUserBio = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => next(err));
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => next(err));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => next(err));
};
