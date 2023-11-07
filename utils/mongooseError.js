const mongooseError = (error, data, next) => {
  error.status = 400;
  next(error);
};
module.exports = mongooseError;
