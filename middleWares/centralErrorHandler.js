const AppError = require("../utils/AppError");

const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateKeyError = (err) => {
  const field = Object.keys(err.keyValue || {}).join(", ");
  const value = err.keyValue ? Object.values(err.keyValue).join(", ") : "";
  const message = field
    ? `Duplicate field value: ${field} = "${value}". Please use another value.`
    : "Duplicate field value detected. Please use another value.";
  return new AppError(message, 400);
};

const handleValidationError = (err) => {
  const errors = Object.values(err.errors || {}).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleExpressValidatorError = (err) => {
  const errors = (err.errors || []).map((error) => error.msg || error.message);
  const message = `Invalid request data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const errorHandler = (err, req, res, next) => {
  let error = err;

  if (err.name === "CastError") error = handleCastError(err);
  else if (
    err.code === 11000 ||
    err.code === 11001 ||
    err.codeName === "DuplicateKey"
  )
    error = handleDuplicateKeyError(err);
  else if (err.name === "ValidationError") error = handleValidationError(err);
  else if (Array.isArray(err.errors) && err.errors.length && err.errors[0].msg)
    error = handleExpressValidatorError(err);

  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = errorHandler;
