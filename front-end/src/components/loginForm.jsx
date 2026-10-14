import  { useState } from 'react';
import { useLogin } from '../hooks/userLogin';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const { handleLogin, loading, error, successMessage } = useLogin();

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin(username, password);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '80px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h2>Login</h2>
      

      {successMessage && (
        <div style={{ color: 'green', marginBottom: '15px', padding: '10px', background: '#e6ffed', border: '1px solid #b7eb8f', borderRadius: '4px' }}>
          {successMessage}
        </div>
      )}


      {error && (
        <div style={{ color: 'red', marginBottom: '15px', padding: '10px', background: '#ffe6e6', border: '1px solid #ffa39e', borderRadius: '4px' }}>
          {error}
        </div>
      )}
      
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ width: '100%', padding: '10px', background: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}