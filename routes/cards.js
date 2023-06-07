const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { validateParamsCardId, validateCreateCard } = require('../utils/validationApi');

router.get('/', getCards);
router.post('/', validateCreateCard, createCard);
router.delete('/:cardId', validateParamsCardId, deleteCard);
router.put('/:cardId/likes', validateParamsCardId, likeCard);
router.delete('/:cardId/likes', validateParamsCardId, dislikeCard);

module.exports = router;
