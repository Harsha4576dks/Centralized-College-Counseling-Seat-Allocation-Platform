 import { Link } from 'react-router-dom';
 import './Navbar.css';
 
export default function Navbar(){

    return (
        <nav className="navbar">
            <div className="navbar-brand">CET Counselling portal</div>
      <div className="navbar-links">
        <Link to="/admin-dashboard" className="nav-link">Admin</Link>
        <Link to="/user-dashboard" className="nav-link">User</Link>
      </div>
        </nav>
    );
}