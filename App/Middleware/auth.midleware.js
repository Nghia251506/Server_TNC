const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Lấy token từ header
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Gắn thông tin user vào req

    // Kiểm tra vai trò
    if (req.user.role === 'admin') {
      return res.status(200).json({ redirect: '/admin' }); // Redirect đến layout admin
    } else if (req.user.role === 'customer') {
      return res.status(200).json({ redirect: '/' }); // Redirect đến layout client
    } else {
      return res.status(403).json({ message: 'Access denied: Invalid role' });
    }
  } catch (error) {
    return res.status(403).json({ message: 'Forbidden: Invalid token' });
  }
};

module.exports = { authenticateJWT };
