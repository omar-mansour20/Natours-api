const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandeler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');
const reviewRouter = require('./routes/reviewRouter');

const app = express();

// Middlewares

// helmet -> adds security http headers
app.use(helmet());

// dev logging requests
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// body parser -> read data from body int req.body
app.use(express.json({ limit: '10mb' })); // Limits the payload size to 10kp

// Data sanatization against NoSQL query injection
app.use(mongoSanitize());

// Data sanatization against xss
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);

// rate limiter for previnting dos attacks
const limiter = rateLimit({
  max: 100, // 100 requests
  windowMs: 60 * 60 * 1000, // every 1 hour
  message: 'Too many requests from this I P,try again after an hour ',
});
app.use('/api', limiter);

// Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

// any other url
app.all('*', (req, res, next) => {
  next(
    new AppError(`can't find the route(${req.originalUrl}) on the server`, 404),
  );
});

app.use(globalErrorHandeler);

module.exports = app;
