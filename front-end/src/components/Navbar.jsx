 import './Navbar.css';
export default function Navbar(){
    const navLinks = [
        {name: 'Home', href:'/home'},
        {name: 'Student Details', href: '/student-Details'},
        {name: 'College Details', href: '#'},
        {name: 'Counselling Round', href: '#'}
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