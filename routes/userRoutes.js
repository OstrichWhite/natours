const express = require('express');
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getMe,
  updateMe,
  deleteMe,
} = require('../controllers/userController');

const {
  signUp,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  restrictTo,
} = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

// Protect all routes after this middleware (Needs Log In - Authentication)
router.use(protect);

router.get('/me', getMe, getUser);
router.patch('/updateMyPassword', updatePassword);
router.patch('/updateMe', updateMe);
router.delete('/deleteMe', deleteMe);

// All route after this middleware are restricted to admin (Authorization)
router.use(restrictTo('admin'));

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

// router.get('/me', protect, getMe, getUser);
// router.patch('/updateMyPassword', protect, updatePassword);
// router.patch('/updateMe', protect, updateMe);
// router.delete('/deleteMe', protect, deleteMe);

// router.route('/').get(getAllUsers).post(createUser);
// router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
