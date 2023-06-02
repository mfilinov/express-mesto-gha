const mongoose = require('mongoose');
const Card = require('../models/card');

const { ValidationError, CastError } = mongoose.Error;

const INVALID_ID = 'InvalidId';

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new Error(INVALID_ID))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err instanceof CastError) {
        res.status(400).send({ message: `Card id=${req.params.cardId} is incorrect` });
      } else if (err.message === INVALID_ID) {
        res.status(404).send({ message: `Card with id=${req.params.cardId} not found` });
      } else {
        res.status(500).send({ message: err.message });
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
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err instanceof CastError) {
        res.status(400).send({ message: err.message });
      } else if (err.message === INVALID_ID) {
        res.status(404).send({ message: `Card with id=${req.params.cardId} not found` });
      } else {
        res.status(500).send({ message: err.message });
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
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err instanceof CastError) {
        res.status(400).send({ message: err.message });
      } else if (err.message === INVALID_ID) {
        res.status(404).send({ message: `Card with id=${req.params.cardId} not found` });
      } else {
        res.status(500).send({ message: err.message });
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
