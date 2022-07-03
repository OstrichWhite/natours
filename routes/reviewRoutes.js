const express = require('express');
const {
  getAllReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
  setTourUserIds,
} = require('../controllers/reviewController');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router({ mergeParams: true }); // POST|GET /tour/234acd74/reviews // POST|GET /reviews

// Protect all routes after this middleware (Needs Log In - Authentication)
router.use(protect);

router
  .route('/')
  .get(getAllReviews)
  .post(restrictTo('user'), setTourUserIds, createReview);

router
  .route('/:id')
  .get(getReview)
  .patch(restrictTo('user', 'admin'), updateReview)
  .delete(restrictTo('user', 'admin'), deleteReview);

module.exports = router;
