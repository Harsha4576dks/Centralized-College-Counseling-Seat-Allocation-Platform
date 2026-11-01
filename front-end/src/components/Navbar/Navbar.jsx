import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-brand-mark" aria-hidden="true">✳</span>
        <span>CET <span className="navbar-brand-light">Counselling portal</span></span>
      </div>
      <div className="navbar-links" aria-label="Dashboard navigation">
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) => `nav-link${isActive ? ' nav-link-active' : ''}`}
        >
          <span className="nav-link-icon" aria-hidden="true">01</span>
          Admin
        </NavLink>
        <NavLink
          to="/user-dashboard"
          className={({ isActive }) => `nav-link${isActive ? ' nav-link-active' : ''}`}
        >
          <span className="nav-link-icon" aria-hidden="true">02</span>
          User
        </NavLink>
      </div>
    </nav>
  );
}