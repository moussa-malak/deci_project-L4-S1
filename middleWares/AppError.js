class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
const express = require("express");
const app = express();
app.use((req, res, next) => {
  const error = new AppError(`Cannot find ${req.originalUrl} on this server!`, 404);
  next(error);
});

module.exports = AppError;
