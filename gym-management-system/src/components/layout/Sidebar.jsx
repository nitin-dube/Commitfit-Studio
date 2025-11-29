import { NavLink, useLocation } from 'react-router-dom';
import {
    FiHome,
    FiUsers,
    FiCheckSquare,
    FiCalendar,
    FiDollarSign,
    FiBarChart2,
    FiSettings
} from 'react-icons/fi';
import './Sidebar.css';

const menuItems = [
    { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/members', icon: FiUsers, label: 'Members' },
    { path: '/attendance', icon: FiCheckSquare, label: 'Attendance' },
    { path: '/classes', icon: FiCalendar, label: 'Classes' },
    { path: '/billing', icon: FiDollarSign, label: 'Billing' },
    { path: '/reports', icon: FiBarChart2, label: 'Reports' },
    { path: '/settings', icon: FiSettings, label: 'Settings' }
];

const Sidebar = () => {
    const location = useLocation();

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo-icon">💪</div>
                <div className="logo-text">
                    <h1>Commitfit</h1>
                    <span>Studio</span>
                </div>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={`nav-item ${isActive ? 'active' : ''}`}
                        >
                            <Icon className="nav-icon" />
                            <span className="nav-label">{item.label}</span>
                        </NavLink>
                    );
                })}
            </nav>
        </aside>
    );
};

export default Sidebar;
