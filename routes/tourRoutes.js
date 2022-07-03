const express = require('express');

const router = express.Router();
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getToursStats,
  getMonthlyPlan,
} = require('../controllers/tourController');
const { protect, restrictTo } = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');

router.use('/:tourId/reviews', reviewRouter);

router.route('/top-5-cheap').get(aliasTopTours, getAllTours); //aliasing ? propably not.
router.route('/tour-stats').get(getToursStats);
router
  .route('/monthly-plan/:year')
  .get(protect, restrictTo('admin', 'lead-user', 'guide'), getMonthlyPlan);
router
  .route('/')
  .get(getAllTours)
  .post(protect, restrictTo('admin', 'lead-guide'), createTour);
router
  .route('/:id')
  .get(getTour)
  .patch(protect, restrictTo('admin', 'lead-user'), updateTour)
  .delete(protect, restrictTo('admin', 'lead-user'), deleteTour);

// POST /tour/234acd74/reviews
// GET /tour/234acd74/reviews
// GET /tour/234acd74/reviews/456acd21

// router
//   .route('/:tourId/reviews')
//   .post(protect, restrictTo('user'), createReview);

module.exports = router;
