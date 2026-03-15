<<<<<<< HEAD
const jwt = require('jsonwebtoken');
=======
const { verifyAccessToken } = require('../config/jwt');
>>>>>>> repo2/main

const auth = (roles = []) => (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
<<<<<<< HEAD
    const token = header.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
=======
    const token = header.startsWith('Bearer ') ? header.slice(7) : '';
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    const decoded = verifyAccessToken(token);
>>>>>>> repo2/main
    if (roles.length && !roles.includes(decoded.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = decoded;
    next();
<<<<<<< HEAD
  } catch (error) {
    console.error('Auth middleware error:', error.message);
=======
  } catch (_err) {
>>>>>>> repo2/main
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { auth };
