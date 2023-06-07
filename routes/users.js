const router = require('express').Router();
const {
  getUsers, getUser, getUserById, updateUserBio, updateUserAvatar,
} = require('../controllers/users');
const { validateParamsMongoId, validateUserBio, validateUserAvatar } = require('../utils/validationApi');

router.get('/', getUsers);
router.get('/me', getUser);
router.get('/:userId', validateParamsMongoId, getUserById);
router.patch('/me', validateUserBio, updateUserBio);
router.patch('/me/avatar', validateUserAvatar, updateUserAvatar);

module.exports = router;
