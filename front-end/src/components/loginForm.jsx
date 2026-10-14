// front-end/src/components/LoginForm.jsx
import  { useState } from 'react';
import { loginUser } from '../services/authService';

export default function LoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(username, password);
      alert('Login successful! Token saved.');
      if (onLoginSuccess) onLoginSuccess();
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
      <h3>Login to Dashboard</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Username/Email: </label>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <label>Password: </label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </div>
      <button type="submit" style={{ marginTop: '10px' }}>Login</button>
    </form>
  );
}