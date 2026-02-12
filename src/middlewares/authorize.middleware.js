const ApiError = require('../utils/ApiError');

const authorize = (...roles) => {
  return (req, res, next) => {

    if (!req.user) {
      return next(new ApiError(401, 'You must be logged in to access this resource.'));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(
          403,
          `Users with role '${req.user.role}' are not authorized to access this resource. Required role(s): ${roles.join(', ')}`
        )
      );
    }

    next();
  };
};

module.exports = authorize;
