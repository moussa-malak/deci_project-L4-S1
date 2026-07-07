const AppError = require("./AppError");

module.exports = (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
};
