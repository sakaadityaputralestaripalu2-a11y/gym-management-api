// src/middleware/authorize.middleware.js
// Usage: authorize('USER'), authorize('ADMIN'), etc.
// Admin always allowed (bypass)

module.exports = function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // Admin bypass
    if (user.role === 'ADMIN') return next();

    // If any allowedRoles matches user's role -> ok
    if (allowedRoles.length === 0) return next(); // no specific role required
    if (allowedRoles.includes(user.role)) return next();

    return res.status(403).json({ success: false, message: 'Forbidden' });
  };
};
