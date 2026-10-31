import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div>
      <Navbar />
      
      <div className="home-container">
        <h1>Welcome to the CET Counselling Cell!</h1>
        <p>You have successfully logged into your counseling system.</p>
        {logoutError && <p role="alert">{logoutError}</p>}
        <div className="logout-wrapper">
          <Button
            label={loggingOut ? 'Logging out...' : 'Logout'}
            onClick={handleLogout}
            variant="danger"
            disabled={loggingOut}
          />
        </div>
      </div>
    </div>
  );
}