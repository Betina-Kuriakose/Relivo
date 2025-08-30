const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

exports.register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({ error: 'email, password and role are required' });
    }
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already registered' });

    const user = new User({ email, password, role });
    await user.save();

    const token = generateToken(user);
    res.status(201).json({ token, user: { email: user.email, role: user.role } });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    console.log('Login request:', { email, role });

    const user = await User.findOne({ email, role });
    console.log('User found:', user ? true : false);

    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await user.comparePassword(password);
    console.log('Password match:', isMatch);

    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = generateToken(user);
    res.json({ token, user: { email: user.email, role: user.role } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

