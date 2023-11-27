const errorHandler = (errorHandler, req, res, next) => {
  const statusCode = res.statusCode ?? 500;
  res.status(statusCode);
  res.json({
    message: errorHandler.message,
    stack: (process.env.NODE_ENV = "production" ? null : errorHandler.stack),
  });
};

module.exports = { errorHandler };
