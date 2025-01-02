const express = require('express');
const AuthController = require('../Controllers/Auth.controller');
const { authenticateJWT } = require('../Middleware/auth.midleware');

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

// Ví dụ route cần quyền admin
router.get('/admin', authenticateJWT, (req, res) => {
  res.json({ message: 'Welcome Admin!' });
});

module.exports = router;
