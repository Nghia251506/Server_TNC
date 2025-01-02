const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User.model');

const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Kiểm tra tài khoản đã tồn tại
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const existingEmail = await User.findByEmail(email);
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Lưu người dùng vào database
    await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || 'customer',
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Tìm người dùng
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Tạo JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      'your_jwt_secret', // Thay bằng secret key của bạn
      { expiresIn: '1h' }
    );

    const redirectPath = user.role === 'admin' ? '/admin/dashboard' : '/client/home';

    res.status(200).json({ 
      message: 'Login successful', 
      token, 
      role: user.role,
      redirectPath 
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

module.exports = { register, login };
