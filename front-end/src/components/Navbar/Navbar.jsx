import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { getAdminSession, getCurrentUser } from '../../services/authService';
import './Navbar.css';

export default function Navbar() {
  const { pathname } = useLocation();
  const isDashboard = pathname === '/admin-dashboard' || pathname === '/user-dashboard';
  const isAdminRoute = pathname === '/admin-dashboard';
  const [sessionRole, setSessionRole] = useState('checking');

  useEffect(() => {
    let active = true;

    const checkSession = async () => {
      try {
        await getAdminSession();
        if (active) {
          setSessionRole('admin');
        }
      } catch {
        try {
          await getCurrentUser();
          if (active) {
            setSessionRole('student');
          }
        } catch {
          if (active) {
            setSessionRole('signed-out');
          }
        }
      }
    };

    checkSession();
    return () => {
      active = false;
    };
  }, []);

  const showAdminLink = isAdminRoute || sessionRole === 'admin';

  return (
    <nav className={`navbar${isDashboard ? ' navbar-dashboard' : ''}`}>
      {isDashboard ? (
        <Link className="navbar-back-link" to="/home">
          <span aria-hidden="true">←</span> Back
        </Link>
      ) : (
        <div className="navbar-brand">
          <span className="navbar-brand-mark" aria-hidden="true">✳</span>
          <span>CET <span className="navbar-brand-light">Counselling portal</span></span>
        </div>
      )}
      <div className="navbar-links" aria-label="Dashboard navigation">
        {showAdminLink && (
          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) => `nav-link${isActive ? ' nav-link-active' : ''}`}
          >
            Admin
          </NavLink>
        )}
        <NavLink
          to="/user-dashboard"
          className={({ isActive }) => `nav-link${isActive ? ' nav-link-active' : ''}`}
        >
          User
        </NavLink>
      </div>
    </nav>
  );
}