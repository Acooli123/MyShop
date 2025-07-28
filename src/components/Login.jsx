import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Regular expressions
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // standard email format
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{9,}$/; 
  // At least 6 characters, 1 letter, 1 number

  const handleLogin = (e) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      setMessage('❌ Invalid email format.');
      return;
    }

    if (!passwordRegex.test(password)) {
      setMessage('❌ Password must be at least 6 characters long and contain at least 1 letter and 1 number.');
      return;
    }

    setMessage('✅ Login successful!');
    setTimeout(() => {
      navigate('/product');
    }, 1000);
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
