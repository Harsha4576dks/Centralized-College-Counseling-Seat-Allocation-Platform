import  { useState } from 'react';
import { useLogin } from '../../hooks/userLogin';
import Button from '../../components/Button/Button';
import './LoginForm.css';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const { handleLogin, loading, error, successMessage } = useLogin();

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin(username, password);
  };
  

  return (
    <div className="login-container">
      <h2>Login</h2>
      
      {successMessage && <div className="login-success">{successMessage}</div>}
      {error && <div className="login-error">{error}</div>}
      
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label className="form-label">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <Button 
          type="submit" 
          label={loading ? 'Logging in...' : 'Login'} 
          disabled={loading} 
          variant="primary"
        />
      </form>
    </div>
  );
}