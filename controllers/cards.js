const mongoose = require('mongoose');
const {
  HTTP_STATUS_CREATED,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
} = require('http2').constants;
const Card = require('../models/card');
const { INTERNAL_SERVER_ERROR, INVALID_ID } = require('../utils/constants');

const { ValidationError, CastError } = mongoose.Error;

const getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      console.log(HTTP_STATUS_INTERNAL_SERVER_ERROR, err.message);
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: INTERNAL_SERVER_ERROR });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(HTTP_STATUS_CREATED).send({ data: card }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        res.status(HTTP_STATUS_BAD_REQUEST).send({ message: err.message });
      } else {
        console.log(HTTP_STATUS_INTERNAL_SERVER_ERROR, err.message);
        res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: INTERNAL_SERVER_ERROR });
      }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new Error(INVALID_ID))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err instanceof CastError) {
        res.status(HTTP_STATUS_BAD_REQUEST).send({ message: `Card id=${req.params.cardId} is incorrect` });
      } else if (err.message === INVALID_ID) {
        res.status(HTTP_STATUS_NOT_FOUND).send({ message: `Card with id=${req.params.cardId} not found` });
      } else {
        console.log(HTTP_STATUS_INTERNAL_SERVER_ERROR, err.message);
        res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: INTERNAL_SERVER_ERROR });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error(INVALID_ID))
    .populate('owner')
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err instanceof CastError) {
        res.status(HTTP_STATUS_BAD_REQUEST).send({ message: err.message });
      } else if (err.message === INVALID_ID) {
        res.status(HTTP_STATUS_NOT_FOUND).send({ message: `Card with id=${req.params.cardId} not found` });
      } else {
        console.log(HTTP_STATUS_INTERNAL_SERVER_ERROR, err.message);
        res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: INTERNAL_SERVER_ERROR });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error(INVALID_ID))
    .populate('owner')
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err instanceof CastError) {
        res.status(HTTP_STATUS_BAD_REQUEST).send({ message: err.message });
      } else if (err.message === INVALID_ID) {
        res.status(HTTP_STATUS_NOT_FOUND).send({ message: `Card with id=${req.params.cardId} not found` });
      } else {
        console.log(HTTP_STATUS_INTERNAL_SERVER_ERROR, err.message);
        res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: INTERNAL_SERVER_ERROR });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
