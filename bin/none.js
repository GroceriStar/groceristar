const LEVELS = Object.freeze({
  basic: 1,
  pro: 2,
  admin: 3
});

/**
 *  Check if user has the required permission level
 */
module.exports = (role) => {
  return (req, res, next) => {
    if (LEVELS[req.user.role] < LEVELS[role]) return res.status(401).end();
    return next();
  }
}