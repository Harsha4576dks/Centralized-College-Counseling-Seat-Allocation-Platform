import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../services/authService';
import { getErrorMessage } from '../../utils/errorHandler';
import Navbar from '../../components/Navbar/Navbar';
import Button from '../../components/Button/Button';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const [logoutError, setLogoutError] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    setLogoutError(null);
    try {
      await logoutUser();
      navigate('/login');
    } catch (error) {
      setLogoutError(getErrorMessage(error));
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="home-page">
      <Navbar />

      <main className="home-container">
        <section className="home-hero" aria-labelledby="home-title">
          <div className="home-hero-copy">
            <p className="home-eyebrow"><span /> YOUR NEXT CHAPTER STARTS HERE</p>
            <h1 id="home-title">
              <span>Find your place.</span>
              <span>Shape your future.</span>
            </h1>
            <p className="home-description">
              Explore colleges, set your preferences, and find your path.
            </p>
            <div className="home-hero-actions">
              <Link className="home-action-link" to="/user-dashboard">
                Continue to student details <span aria-hidden="true">↗</span>
              </Link>
              <span className="home-action-caption">YOUR JOURNEY, YOUR DIRECTION</span>
            </div>
          </div>

          <div className="home-visual" aria-hidden="true">
            <div className="home-orbit home-orbit-outer" />
            <div className="home-orbit home-orbit-inner" />
            <div className="home-compass">
              <span className="compass-north">N</span>
              <span className="compass-east">E</span>
              <span className="compass-south">S</span>
              <span className="compass-west">W</span>
              <span className="compass-center">✳</span>
            </div>
            <div className="home-note-card">
              <span className="home-note-mark">✳</span>
              <p>Every great destination<br />starts with a first step.</p>
              <span className="home-note-caption">LET’S FIND YOUR WAY</span>
            </div>
            <span className="home-visual-index">01 <span /> 03</span>
          </div>
        </section>

        <section className="home-next-step" aria-label="Getting started">
          <div className="next-step-number">01</div>
          <div className="next-step-copy">
            <p className="next-step-label">YOUR FIRST STEP</p>
            <h2>Start with your student profile</h2>
            <p>Add your details to unlock the counselling preferences journey.</p>
          </div>
          <Link className="next-step-link" to="/user-dashboard" aria-label="Go to student details">
            <span aria-hidden="true">↗</span>
          </Link>
        </section>

        {logoutError && <p className="home-logout-error" role="alert">{logoutError}</p>}
        <div className="logout-wrapper">
          <Button
            label={loggingOut ? 'Logging out...' : 'Log out'}
            onClick={handleLogout}
            variant="danger"
            disabled={loggingOut}
          />
        </div>
      </main>
    </div>
  );
}