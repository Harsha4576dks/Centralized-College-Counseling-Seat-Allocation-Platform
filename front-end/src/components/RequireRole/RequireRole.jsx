import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../../services/authService';

export default function RequireRole({ role, children }) {
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    let active = true;

    getCurrentUser()
      .then((user) => {
        if (active) {
          setStatus(user.role === role ? 'allowed' : 'forbidden');
        }
      })
      .catch(() => {
        if (active) {
          setStatus('signed-out');
        }
      });

    return () => {
      active = false;
    };
  }, [role]);

  if (status === 'checking') {
    return <main className="route-checking" aria-live="polite">Checking your access...</main>;
  }

  if (status === 'forbidden') {
    return <Navigate to={role === 'admin' ? '/home' : '/admin-dashboard'} replace />;
  }

  if (status === 'signed-out') {
    return <Navigate to={role === 'admin' ? '/admin/login' : '/login'} replace />;
  }

  return children;
}
