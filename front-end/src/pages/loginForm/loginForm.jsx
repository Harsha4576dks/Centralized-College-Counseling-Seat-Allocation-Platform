import { useState } from 'react';
import { Link } from 'react-router-dom';
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
    <main className="login-page">
      <section className="login-showcase" aria-label="Counseling platform introduction">
        <div className="showcase-orbit showcase-orbit-one" />
        <div className="showcase-orbit showcase-orbit-two" />

        <div className="brand-mark" aria-hidden="true">
          <span className="brand-icon" aria-hidden="true">
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

      <section className="login-panel" aria-labelledby="login-title">
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
            <p className="form-eyebrow">WELCOME BACK</p>
            <h2 id="login-title">Let’s pick up<br />where you left off.</h2>
            <p className="login-subtitle">Sign in to continue your journey.</p>
          </div>

          {successMessage && <div className="login-message login-success" role="status">{successMessage}</div>}
          {error && <div className="login-message login-error" role="alert">{error}</div>}

          <form className="login-form" onSubmit={onSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="login-username">Username</label>
              <input
                id="login-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                placeholder="Enter your username"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="Enter your password"
                required
                className="form-input"
              />
            </div>

            <Button
              type="submit"
              label={loading ? 'Signing you in...' : 'Sign in'}
              disabled={loading}
              variant="primary"
            />
          </form>

          <p className="login-footnote">
            A clearer path to college starts with one step.
          </p>
          <p className="auth-switch">
            New here? <Link to="/register">Create an account</Link>
          </p>
          <p className="auth-switch">
            CET Cell administrator? <Link to="/admin/login">Admin sign in</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
