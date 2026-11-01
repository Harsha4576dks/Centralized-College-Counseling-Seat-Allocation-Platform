import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../services/authService';
import { getErrorMessage } from '../../utils/errorHandler';
import Navbar from '../../components/Navbar/Navbar';
import Button from '../../components/Button/Button';
import campusOne from '../../assets/image1.png';
import campusTwo from '../../assets/image2.jpg';
import campusThree from '../../assets/image3.jpg';
import './Home.css';

const campusImages = [campusOne, campusTwo, campusThree];

export default function Home() {
  const navigate = useNavigate();
  const [logoutError, setLogoutError] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setBackgroundIndex((index) => (index + 1) % campusImages.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

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
      <div className="home-background" aria-hidden="true">
        {campusImages.map((image, index) => (
          <div
            className={`home-background-scene${index === backgroundIndex ? ' is-active' : ''}`}
            key={image}
            style={{ backgroundImage: `url("${image}")` }}
          />
        ))}
      </div>
      <Navbar />

      <main className="home-container">
        <div className="home-content-layout">
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
              </div>
            </div>
          </section>
        </div>

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