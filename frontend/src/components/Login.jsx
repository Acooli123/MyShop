import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      setMessage('❌ Invalid email format.');
      return;
    }

    if (!passwordRegex.test(password)) {
      setMessage('❌ Password must be at least 6 characters long and contain at least 1 letter and 1 number.');
      return;
    }

    try {
      const response = await fetch('https://myshop-5.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem('token', data.token); // Store JWT
        setMessage('✅ Login successful!');
        setTimeout(() => {
          navigate('/product');
        }, 1000);
      } else {
        setMessage(`❌ ${data.error || 'Login failed'}`);
      }
    } catch (err) {
      setMessage('❌ Server error');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>

      <p className="mt-3 text-center">
        Don't have an account? <a href="/signup">Sign up</a>
      </p>

      {message && (
        <div
          className="alert mt-3"
          style={{ color: message.includes('✅') ? 'green' : 'red' }}
        >
          {message}
        </div>
      )}
    </div>
  );
}
