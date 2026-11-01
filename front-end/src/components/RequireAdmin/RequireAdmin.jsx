import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getAdminSession } from '../../services/authService';
import { getErrorMessage } from '../../utils/errorHandler';

export default function RequireAdmin({ children }) {
  const [status, setStatus] = useState('checking');
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    getAdminSession()
      .then(() => {
        if (active) {
          setStatus('allowed');
        }
      })
      .catch((sessionError) => {
        if (active) {
          if (sessionError?.response?.status === 401) {
            setStatus('signed-out');
          } else {
            setError(`Unable to verify admin access: ${getErrorMessage(sessionError)}`);
            setStatus('error');
          }
        }
      });

    return () => {
      active = false;
    };
  }, []);

  if (status === 'checking') {
    return <main className="route-checking" aria-live="polite">Checking admin access...</main>;
  }

  if (status === 'signed-out') {
    return <Navigate to="/admin/login" replace />;
  }

  if (status === 'error') {
    return <main className="route-checking" role="alert">{error}</main>;
  }

  return children;
}
