const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
  try {
    console.log('AUTH HEADER:', req.headers.authorization);
    console.log('JWT SECRET:', process.env.JWT_SECRET);

    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    console.log('TOKEN EXTRACTED:', token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('DECODED:', decoded);

    const user = await User.findById(decoded.id);
    console.log('USER FOUND:', user ? 'YES' : 'NO');

    if (!user) {
      return res.status(401).json({
        success: false,
        error: { message: 'User no longer exists' }
      });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('AUTH ERROR:', err.message);
    return res.status(401).json({
      success: false,
      error: { message: 'Invalid or expired token' }
    });
  }
};

module.exports = authenticate;
