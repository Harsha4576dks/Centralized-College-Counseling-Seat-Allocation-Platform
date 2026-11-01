import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { loginAdmin } from '../../services/authService';
import { getErrorMessage } from '../../utils/errorHandler';
import '../loginForm/LoginForm.css';
import './AdminAuth.css';

export default function AdminLoginForm() {
  const navigate = useNavigate();
  const username = 'CET cell';
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await loginAdmin(username, password);
      navigate('/admin-dashboard', { replace: true });
    } catch (loginError) {
      setError(getErrorMessage(loginError));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page admin-auth-page">
      <section className="login-showcase" aria-label="Administrator workspace">
        <div className="showcase-orbit showcase-orbit-one" />
        <div className="showcase-orbit showcase-orbit-two" />
        <div className="brand-mark" aria-hidden="true">
          <span className="brand-icon"><span /><span /><span /><span /></span>
        </div>
        <div className="showcase-copy">
          <p className="eyebrow"><span /> COUNSELLING OPERATIONS</p>
          <h1>Lead the process.<br /><span>Shape outcomes.</span></h1>
          <p className="showcase-description">
            A dedicated workspace for the CET counselling cell team.
          </p>
        </div>
        <div className="showcase-footer">
          <span>AUTHORIZED ADMINISTRATORS ONLY</span>
          <span className="footer-line" />
          <span>SECURE ACCESS</span>
        </div>
      </section>

      <section className="login-panel" aria-labelledby="admin-login-title">
        <div className="login-panel-inner">
          <div className="login-heading">
            <p className="form-eyebrow">ADMINISTRATOR ACCESS</p>
            <h2 id="admin-login-title">Welcome back,<br />CET Cell.</h2>
            <p className="login-subtitle">Sign in to manage counselling operations.</p>
          </div>

          {error && <div className="login-message login-error" role="alert">{error}</div>}

          <form className="login-form" onSubmit={onSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="admin-username">Admin username</label>
              <input
                id="admin-username"
                type="text"
                value={username}
                readOnly
                autoComplete="username"
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="admin-password">Password</label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                placeholder="Enter the admin password"
                required
                className="form-input"
              />
            </div>
            <Button
              type="submit"
              label={loading ? 'Verifying access...' : 'Enter admin workspace'}
              disabled={loading}
              variant="primary"
            />
          </form>

          <p className="auth-switch">
            Not an administrator? <Link to="/login">Student sign in</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
