const Review = require('../model/reviewModel');

const {
  deleteOne,
  updateOne,
  createOne,
  getAll,
  getOne,
} = require('./handlerFactory');

exports.deleteReview = deleteOne(Review);
exports.updateReview = updateOne(Review);
exports.createReview = createOne(Review);
exports.getReview = getOne(Review);
exports.getAllReviews = getAll(Review);

exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
