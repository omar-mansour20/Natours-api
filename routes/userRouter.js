const express = require('express');
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
} = require('../controllers/userController');
const {
  signup,
  login,
  resetPassword,
  forgotPassword,
  updatePassword,
  protect,
  restrictTO,
} = require('../controllers/authController');

const router = express.Router();
router
  .post('/login', login)
  .post('/signup', signup)
  .post('/forgotPassword', forgotPassword)
  .patch('/resetPassword/:token', resetPassword);

router.use(protect); // Protects the below

router
  .patch('/updateMyPassword', updatePassword)
  .patch('/updateMe', updateMe)
  .delete('/deleteMe', deleteMe)
  .get('/me', getMe, getUser);

router.use(restrictTO('admin')); // anly admin can access the below

router
  .get('/', getAllUsers)
  .post('/', createUser)
  .get('/:id', getUser)
  .patch('/:id', updateUser)
  .delete('/:id', deleteUser);
module.exports = router;
