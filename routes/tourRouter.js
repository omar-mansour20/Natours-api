const express = require('express');
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
  getToursWithin,
  getDistances,
} = require('../controllers/tourController');
const { protect, restrictTO } = require('../controllers/authController');
const reviewRouter = require('../routes/reviewRouter');

const router = express.Router();

// redirect to reviewRouter (mergeParams)
router.use('/:tourId/reviews', reviewRouter);

router
  .get('/', getAllTours)
  .post('/', protect, restrictTO('admin', 'lead-guide'), createTour)
  .get('/top-5-cheap', aliasTopTours, getAllTours)
  .get('/tour-stats', getTourStats)
  .get(
    '/monthly-plan/:year',
    protect,
    restrictTO('admin', 'lead-guide', 'user'),
    getMonthlyPlan,
  )
  .get('/:id', getTour)
  .patch('/:id', protect, restrictTO('admin', 'lead-guide'), updateTour)
  .delete('/:id', protect, restrictTO('admin', 'lead-guide'), deleteTour)
  .get('/tours-within/:distance/center/:latlng/unit/:unit', getToursWithin)
  .get('/distances/:latlng/unit/:unit', getDistances);

module.exports = router;
