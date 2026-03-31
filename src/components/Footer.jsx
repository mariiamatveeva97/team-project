import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
        <div className="footer-section">
            <h4>SmartBooking</h4>
            <Link to="/about">About us</Link>
            <Link to="/join">Join the team</Link>
        </div>

        <div className="footer-section">
            <h4>Support</h4>
            <Link to="/contact">Contact</Link>
            <Link to="/help-center">Help Center</Link>
        </div>

        <div className="footer-section">
            <h4>Social</h4>
            <p>FB</p>
            <p>IG</p>
        </div>
        </footer>
    );
}

export default Footer;
