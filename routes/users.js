const router = require('express').Router();
const {
  getUsers, getUserById, createUser, updateUserBio, updateUserAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:userId', getUserById);
router.post('/users', createUser);
router.patch('/users/me', updateUserBio);
router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
