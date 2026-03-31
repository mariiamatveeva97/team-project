import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
    return (
        <header className="header">
        <div className="logo">SmartBooking</div>

        <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/booking">Booking</Link>
            <Link to="/help-center">Help Center</Link>
            <Link to="/contact">Contact</Link>
        </nav>

        <div className="actions">
            <button className="lang-btn">NL</button>
            <button className="login-btn">Login</button>
        </div>
        </header>
    );
}

export default Header;
