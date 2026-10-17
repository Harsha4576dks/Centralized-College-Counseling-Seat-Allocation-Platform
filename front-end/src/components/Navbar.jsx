 import '../styles/Navbar.css';
 
export default function Navbar(){
    const navLinks = [
        {name: 'Admin', href:'#'},
        {name: 'User', href: '/student-Details'},
     ];

    return (
        <nav className="navbar">
            <h2 className="navbar-brand">CET Counselling portal</h2>

            <ul className="navbar-links">
                {navLinks.map((link, index) => (
                    <li key={index}>
                        <a href={link.href} className="navbar-link">
                            {link.name}
                            </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}