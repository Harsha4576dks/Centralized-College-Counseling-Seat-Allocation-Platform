// front-end/src/App.jsx
import { useState, useEffect } from 'react';
import loginForm from '../components/LoginForm';
import StudentDashboard from './components/StudentDashboard';
import { logoutUser } from './services/authService';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    logoutUser();
    setIsAuthenticated(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>CET Counseling & Allocation Portal</h1>
      
      {!isAuthenticated ? (
        <loginForm onLoginSuccess={() => setIsAuthenticated(true)} />
      ) : (
        <div>
          <button 
            onClick={handleLogout} 
            style={{ marginBottom: '20px', background: 'red', color: 'white', padding: '5px 10px', border: 'none', cursor: 'pointer' }}
          >
            Logout
          </button>
          <StudentDashboard studentId={1} />
        </div>
      )}
    </div>
  );
}