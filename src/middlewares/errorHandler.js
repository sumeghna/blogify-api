const errorHandler = (err, req, res, next) => {
  // MongoDB duplicate key error (E11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    const value = err.keyValue[field];

    return res.status(400).json({
      success: false,
      error: {
        message: `${field} '${value}' already exists`,
        field
      }
    });
  }

  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map(error => error.message)
      .join(', ');

    return res.status(400).json({
      success: false,
      error: { message }
    });
  }

  // Default server error
  return res.status(500).json({
    success: false,
    error: {
      message: err.message || 'Server Error'
    }
  });
};

module.exports = errorHandler;
