const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDublicateFieldDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Dublicate field value:${value}. please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () => {
  new AppError('Invalid token, please log in again', 401);
};

const handleJWTExpiresError = () => {
  new AppError('Your token has expired, please log in again', 401);
};

const sendErrorDevelopment = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProduction = (err, res) => {
  // Operational, Known errors
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Unknown errors
  } else {
    console.error('ERROR:😭', err);

    res.status(err.statusCode).json({
      status: 'error',
      message: 'Somthing went wrong ',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV == 'development') {
    sendErrorDevelopment(err, res);
  } else if (process.env.NODE_ENV == 'production') {
    let error = Object.create(err);
    // let error = { ...err }; --> won't work , because name is Non-enumerable property

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDublicateFieldDB(error);
    // Errors from mongoose
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiresError();

    sendErrorProduction(error, res);
  }
};
