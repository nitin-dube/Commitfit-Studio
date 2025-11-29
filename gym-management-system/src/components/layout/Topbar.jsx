import { useAuth } from '../../context/AuthContext';
import { FiBell, FiUser, FiLogOut } from 'react-icons/fi';
import './Topbar.css';

const Topbar = () => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            logout();
        }
    };

    return (
        <header className="topbar">
            <div className="topbar-left">
                <h1 className="page-title">Commitfit Studio</h1>
            </div>

            <div className="topbar-right">
                <button className="topbar-action" title="Notifications">
                    <FiBell />
                    <span className="notification-badge">3</span>
                </button>

                <div className="topbar-divider"></div>

                <div className="user-info">
                    <div className="user-avatar">
                        <FiUser />
                    </div>
                    <div className="user-details">
                        <p className="user-name">{user?.name || 'Admin'}</p>
                        <p className="user-role">{user?.role || 'Administrator'}</p>
                    </div>
                </div>

                <button
                    className="topbar-action logout-btn"
                    onClick={handleLogout}
                    title="Logout"
                >
                    <FiLogOut />
                </button>
            </div>
        </header>
    );
};

export default Topbar;
