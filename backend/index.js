const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// User Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model('User', UserSchema);

// Register Route
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({ name, email, password: hash });
    res.json({ status: 'ok', user });
  } catch (err) {
    res.status(400).json({ status: 'error', error: 'Email already exists' });
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to the MyShop API');
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: 'User not found' });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    return res.status(400).json({ error: 'Invalid password' });

  const token = jwt.sign(
    { id: user._id, email: user.email },
    JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.json({
    status: 'ok',
    token,
    user: { name: user.name, email: user.email },
  });
});

// Start server
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
// Export app for testing
module.exports = app;