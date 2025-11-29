import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import gymProfile from '../../config/gymProfile';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3 className="footer-brand">{gymProfile.name}</h3>
                    <p className="footer-tagline">{gymProfile.tagline}</p>
                    <div className="footer-info-row">
                        <FiMapPin className="footer-icon" />
                        <span>{gymProfile.address.city}, {gymProfile.address.state}</span>
                    </div>
                    <a href={`tel:${gymProfile.contact.phone}`} className="footer-info-row">
                        <FiPhone className="footer-icon" />
                        <span>{gymProfile.contact.phone}</span>
                    </a>
                    <a href={`mailto:${gymProfile.contact.email}`} className="footer-info-row">
                        <FiMail className="footer-icon" />
                        <span>{gymProfile.contact.email}</span>
                    </a>
                </div>

                <div className="footer-section">
                    <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 'var(--spacing-sm)' }}>Quick Links</h4>
                    <nav className="footer-links">
                        <Link to="/dashboard" className="footer-link">Dashboard</Link>
                        <Link to="/members" className="footer-link">Members</Link>
                        <Link to="/classes" className="footer-link">Classes</Link>
                        <Link to="/reports" className="footer-link">Reports</Link>
                        <Link to="/settings" className="footer-link">Settings</Link>
                    </nav>
                </div>

                <div className="footer-section">
                    <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 'var(--spacing-sm)' }}>Hours</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', margin: 0 }}>
                        {gymProfile.hours.description}
                    </p>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} {gymProfile.name}. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
