import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/authService';

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Welcome to the Home Page!</h1>
      <p>You have successfully logged into your application.</p>
      <button 
        onClick={handleLogout}
        style={{ marginTop: '20px', padding: '10px 20px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Logout
      </button>
    </div>
  );
}