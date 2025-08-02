const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = 'your_jwt_secret'; // Should be in .env

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/myshop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// User Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model('User', UserSchema);

// Register
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

// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: 'User not found' });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    return res.status(400).json({ error: 'Invalid password' });

  const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: '1d',
  });

  res.json({ status: 'ok', token, user: { name: user.name, email: user.email } });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));