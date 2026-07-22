exports.errorHandler = (err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  const body = { error: message };
  if (Array.isArray(err.details) && err.details.length > 0) {
    body.details = err.details;
  }
  res.status(status).json(body);
};
