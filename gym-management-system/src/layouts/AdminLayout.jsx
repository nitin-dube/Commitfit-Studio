import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import Footer from '../components/layout/Footer';
import './AdminLayout.css';

const AdminLayout = () => {
    return (
        <div className="admin-layout">
            <Sidebar />
            <div className="main-content">
                <Topbar />
                <main className="content-area">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default AdminLayout;
