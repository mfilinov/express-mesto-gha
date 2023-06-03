const router = require('express').Router();
const {
  getUsers, getUserById, createUser, updateUserBio, updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.patch('/me', updateUserBio);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
