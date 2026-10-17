import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/authService';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import '../styles/Home.css';


export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <div>
      <Navbar />
      
      <div className="home-container">
        <h1>Welcome to the CET Counselling Cell!</h1>
        <p>You have successfully logged into your counseling system.</p>
        
        </div>
        
          <div className="logout-wrapper">
          <Button 
            label="Logout" 
            onClick={handleLogout} 
            variant="danger" 
          />
      </div>
    </div>
  );
}