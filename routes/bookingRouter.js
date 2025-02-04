const express = require('express');
const {
  getCheckoutSession,
  getAllBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  getBooking,
} = require('./../controllers/bookingController');
const { protect, restrictTO } = require('./../controllers/authController');

const router = express.Router();

router.use(protect);

router.get('/checkout-session/:tourId', getCheckoutSession);
  
router.use(restrictTO('admin', 'lead-guide'));

router.get('/', getAllBookings).post('/', createBooking);
router
  .get('/:id', getBooking)
  .patch('/:id', updateBooking)
  .delete('/:id', deleteBooking);

module.exports = router;
