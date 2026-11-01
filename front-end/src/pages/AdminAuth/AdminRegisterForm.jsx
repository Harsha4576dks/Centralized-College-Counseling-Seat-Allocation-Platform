import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { registerAdmin } from '../../services/authService';
import { getErrorMessage } from '../../utils/errorHandler';
import '../loginForm/LoginForm.css';
import './AdminAuth.css';

export default function AdminRegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationKey, setRegistrationKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await registerAdmin('cet cell', email, password, registrationKey);
      setSuccess(true);
    } catch (registrationError) {
      setError(getErrorMessage(registrationError));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page admin-auth-page">
      <section className="login-showcase" aria-label="Administrator account setup">
        <div className="showcase-orbit showcase-orbit-one" />
        <div className="showcase-orbit showcase-orbit-two" />
        <div className="brand-mark" aria-hidden="true">
          <span className="brand-icon"><span /><span /><span /><span /></span>
        </div>
        <div className="showcase-copy">
          <p className="eyebrow"><span /> CONTROLLED ACCOUNT SETUP</p>
          <h1>One team.<br /><span>One secure space.</span></h1>
          <p className="showcase-description">
            Administrator accounts can only be created with the private setup key.
          </p>
        </div>
        <div className="showcase-footer">
          <span>CET COUNSELLING CELL</span>
          <span className="footer-line" />
          <span>ADMIN SETUP</span>
        </div>
      </section>

      <section className="login-panel" aria-labelledby="admin-register-title">
        <div className="login-panel-inner">
          <div className="login-heading">
            <p className="form-eyebrow">ADMIN ACCOUNT SETUP</p>
            <h2 id="admin-register-title">Create the<br />CET Cell account.</h2>
            <p className="login-subtitle">This account is reserved for the configured administrator.</p>
          </div>

          {success && (
            <div className="login-message login-success" role="status">
              Admin account created. <Link to="/admin/login">Continue to admin sign in.</Link>
            </div>
          )}
          {error && <div className="login-message login-error" role="alert">{error}</div>}

          <form className="login-form" onSubmit={onSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="admin-register-username">Admin username</label>
              <input
                id="admin-register-username"
                type="text"
                value="cet cell"
                readOnly
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="admin-register-email">Admin email</label>
              <input
                id="admin-register-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                placeholder="admin@example.com"
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="admin-register-password">Admin password</label>
              <input
                id="admin-register-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="new-password"
                placeholder="Enter the configured admin password"
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="admin-registration-key">Private registration key</label>
              <input
                id="admin-registration-key"
                type="password"
                value={registrationKey}
                onChange={(event) => setRegistrationKey(event.target.value)}
                autoComplete="off"
                placeholder="Provided by the system administrator"
                required
                className="form-input"
              />
            </div>
            <Button
              type="submit"
              label={loading ? 'Setting up account...' : 'Create admin account'}
              disabled={loading}
              variant="primary"
            />
          </form>

          <p className="auth-switch">
            Already registered? <Link to="/admin/login">Admin sign in</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
