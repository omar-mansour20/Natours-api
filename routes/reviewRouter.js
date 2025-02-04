const express = require('express');
const { protect, restrictTO } = require('../controllers/authController');
const {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  setTourUserIds,
  getReview,
} = require('../controllers/reviewController');

const router = express.Router({ mergeParams: true });

router.use(protect);

router
  .get('/:id', getReview)
  .get('/', getAllReviews)
  .post('/', restrictTO('user'), setTourUserIds, createReview)
  .delete('/:id', restrictTO('user', 'admin'), deleteReview)
  .patch('/:id', restrictTO('user', 'admin'), updateReview);

module.exports = router;
