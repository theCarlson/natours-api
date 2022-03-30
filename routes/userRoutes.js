const express = require('express');
const {
  getAllUsers,
  createNewUser,
  getOneUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
} = require('../controllers/userController');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  restrictTo,
} = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

// Doing this will protect all routes that come after
// declaration because Middleware runs in sequence.
// Anything after this code you need to be logged in
// to be able to perform whatever task the code presents.
router.use(protect);

router.patch('/updateMyPassword', updatePassword);
router.get('/me', getMe, getOneUser);
router.patch('/updateMe', updateMe);
router.delete('/deleteMe', deleteMe);

// All routes after this will be restricted to the
// admin
router.use(restrictTo('admin'));

router.route('/').get(getAllUsers).post(createNewUser);

router.route('/:id').get(getOneUser).patch(updateUser).delete(deleteUser);

module.exports = router;
