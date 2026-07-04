const ok = (res, data, message) => {
  res.status(200).json({
    status: "success",
    data,
    message,
  });
};
const error = (res, message, statusCode = 500) => {
  res.status(statusCode).json({
    status: "error",
    message: message || "An error occurred",
  });
};

// Central error handler middleware
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = {
  response: {
    ok,
    error,
  },
  errorHandler,
};
