import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/authService';
import Navbar from './Navbar';
import Button from './Button';
import './Home.css';


export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const handleContinue = () =>{
    navigate('/student Details');
  };

  return (
    <div>
      <Navbar />
      
      <div className="home-container">
        <h1>Welcome to the CET Counselling Cell!</h1>
        <p>You have successfully logged into your counseling system.</p>
        
        <div className="continue-wrapper">
          <Button
          label = "Continue"
          onClick={handleContinue}
          variant="primary"          
          />
          
        </div>
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