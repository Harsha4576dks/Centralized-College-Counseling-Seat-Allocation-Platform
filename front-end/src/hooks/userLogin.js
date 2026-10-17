import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { getErrorMessage } from '../utils/errorHandler';


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
    } catch (submitError) {
      setError(getErrorMessage(submitError));
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error, successMessage };
};