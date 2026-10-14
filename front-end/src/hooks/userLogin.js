import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); 
  const navigate = useNavigate();

  const handleLogin = async (username, password) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await loginUser(username, password);
      setSuccessMessage('Login successful! Redirecting...');
      

      setTimeout(() => {
        navigate('/home');
      }, 1000);
    } catch (err) {
      const responseDetail = err.response?.data?.detail;
      
      let errorMsg = 'Invalid username or password. Please try again.';

      
      if (typeof responseDetail === 'string') {
        errorMsg = responseDetail;
      } else if (Array.isArray(responseDetail)) {
        errorMsg = responseDetail.map(e => e.msg).join(', ');
      } else if (typeof responseDetail === 'object' && responseDetail !== null) {
        errorMsg = JSON.stringify(responseDetail);
      }

      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error, successMessage };
};