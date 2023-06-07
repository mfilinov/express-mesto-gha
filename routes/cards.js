const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { validateParamsMongoId, validateCreateCard } = require('../utils/validationApi');

router.get('/', getCards);
router.post('/', validateCreateCard, createCard);
router.delete('/:cardId', validateParamsMongoId, deleteCard);
router.put('/:cardId/likes', validateParamsMongoId, likeCard);
router.delete('/:cardId/likes', validateParamsMongoId, dislikeCard);

module.exports = router;
