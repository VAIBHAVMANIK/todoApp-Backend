const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal error";
  err.statusCode = err.statusCode || 500;

  if (
    err.message ===
    "Task validation failed: description: Path `description` is required., title: Path `title` is required"
  ) {
    err.message = "Task and description are required";
    err.statusCode = 406;
  }

  res.status(err.statusCode).json({
    Success: false,
    message: err.message,
  });
};

export default errorMiddleware;
