import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { registerUser } from '../../services/authService';
import { getErrorMessage } from '../../utils/errorHandler';
import '../loginForm/LoginForm.css';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await registerUser(username, email, password);
      setSuccess(true);
    } catch (submitError) {
      setError(getErrorMessage(submitError));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-showcase" aria-label="Counseling platform introduction">
        <div className="showcase-orbit showcase-orbit-one" />
        <div className="showcase-orbit showcase-orbit-two" />

        <div className="brand-mark" aria-hidden="true">
          <span className="brand-icon">
            <span />
            <span />
            <span />
            <span />
          </span>
        </div>

        <div className="showcase-copy">
          <p className="eyebrow"><span /> YOUR NEXT CHAPTER STARTS HERE</p>
          <h1>Find your place.<br /><span>Shape your future.</span></h1>
          <p className="showcase-description">
            Your college journey, made clearer. Explore your options and take
            the next step with confidence.
          </p>
        </div>

        <div className="showcase-note">
          <span className="note-spark" aria-hidden="true">✳</span>
          <p>Big decisions feel better<br />when you have a plan.</p>
          <span className="note-caption">LET’S FIND YOUR WAY</span>
        </div>

        <div className="showcase-footer">
          <span>MADE FOR YOUR NEXT MOVE</span>
          <span className="footer-line" />
          <span>01 — 03</span>
        </div>
      </section>

      <section className="login-panel" aria-labelledby="register-title">
        <div className="login-panel-inner">
          <div className="mobile-brand" aria-hidden="true">
            <span className="brand-icon">
              <span />
              <span />
              <span />
              <span />
            </span>
          </div>

          <div className="login-heading">
            <p className="form-eyebrow">GET STARTED</p>
            <h2 id="register-title">Make your next<br />move with us.</h2>
            <p className="login-subtitle">Create an account to begin your journey.</p>
          </div>

          {success && (
            <div className="login-message login-success" role="status">
              Your account is ready. <Link to="/login">Sign in to continue.</Link>
            </div>
          )}
          {error && <div className="login-message login-error" role="alert">{error}</div>}

          <form className="login-form" onSubmit={onSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="register-username">Username</label>
              <input
                id="register-username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username"
                placeholder="Choose a username"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="register-email">Email</label>
              <input
                id="register-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                placeholder="you@example.com"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="register-password">Password</label>
              <input
                id="register-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="new-password"
                placeholder="Create a password"
                required
                className="form-input"
              />
            </div>

            <Button
              type="submit"
              label={loading ? 'Creating account...' : 'Create account'}
              disabled={loading}
              variant="primary"
            />
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
