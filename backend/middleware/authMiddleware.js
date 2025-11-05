// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user info to request
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token.'
    });
  }
};

// Optional: Verify user can only access their own profile
export const verifyOwnership = (req, res, next) => {
  try {
    // Check if the userId in params matches the authenticated user's id
    if (req.params.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only access your own profile.'
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};