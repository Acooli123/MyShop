import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  const handleSignup = async (e) => {
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
      const response = await fetch('https://myshop-4.onrender.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (data.status === 'ok') {
        setMessage('✅ Registration successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setMessage(`❌ ${data.error || 'Registration failed'}`);
      }
    } catch (err) {
      setMessage('❌ Server error');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="text-center mb-4">Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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

        <button type="submit" className="btn btn-success w-100">
          Sign Up
        </button>
      </form>

      {message && (
        <div className="alert mt-3" style={{ color: message.includes('✅') ? 'green' : 'red' }}>
          {message}
        </div>
      )}
    </div>
  );
}
